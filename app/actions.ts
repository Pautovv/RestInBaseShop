'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, VerificationUserTemplate } from "@/shared/components/shared";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Идентификатор корзины не найден.');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        if (!userCart) {
            throw new Error('Корзина не найдена.');
        }

        if (!userCart.items.length || userCart.totalAmount === 0) {
            throw new Error('Корзина пуста.');
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: [data.firstName, data.lastName].filter(Boolean).join(' '),
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(
                    userCart.items.map(item => ({
                        name: item.productItem.product.name,
                        size: item.productItem.size,
                        color: item.productItem.color,
                        price: item.productItem.price,
                        quantity: item.quantity,
                    }))
                ),
            },
        });

        await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });
        await prisma.cart.update({ where: { id: userCart.id }, data: { totalAmount: 0 } });

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: `Оплата заказа #${order.id}`,
        });

        if (!paymentData) {
            throw new Error('Не удалось создать оплату');
        }

        await prisma.order.update({
            where: { id: order.id },
            data: { paymentId: paymentData.id },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(
            data.email,
            'RESTINBASE / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,
            }),
        );

        return paymentUrl;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error("Почта не подтверждена");
            }
            throw new Error("Пользователь уже существует");
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(
            createdUser.email,
            "RESTINBASE / 📝 Подтверждение регистрации", 
            VerificationUserTemplate({
                code,
            }),
        );
    } catch (err) {
        console.log("Error [CREATE_USER]", err);
        throw err;
    }
}

export async function updateUserInfo(body: { email: string, fullName: string, password?: string }) {
    try {
        const currentUser = await getUserSession();
        if (!currentUser?.id) throw new Error('Пользователь не найден');

        const findUser = await prisma.user.findUnique({
            where: { id: Number(currentUser.id) },
        });

        await prisma.user.update({
            where: { id: Number(currentUser.id) },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password, 10) : findUser?.password,
            },
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}