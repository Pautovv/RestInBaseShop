import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

import { categories, collections } from './constants';

const randomPrice = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = ({
    productId,
    color,
    size,
    imageFrontUrl,
    imageBackUrl,
}: {
    productId: number;
    color: 'red' | 'blue' | 'purple' | 'green' | 'black' | 'white';
    size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
    imageFrontUrl: string;
    imageBackUrl: string;
}) => {
    return {
        productId,
        price: randomPrice(190, 600),
        color,
        size,
        imageFrontUrl,
        imageBackUrl,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
        skipDuplicates: true,
    });

    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    });

    await prisma.collection.createMany({
        data: collections,
        skipDuplicates: true,
    });

    const tshirt1 = await prisma.product.create({
        data: {
            name: 'Abc Camo Big Ape Head Tee',
            categoryId: 1,
            gender: ['MALE', 'FEMALE'],
            collectionId: 1,
        },
    })

    const tshirt2 = await prisma.product.create({
        data: {
            name: 'Color Camo Big Ape Head Tee',
            categoryId: 1,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const tshirt3 = await prisma.product.create({
        data: {
            name: 'Abc Camo Asnka Tee',
            categoryId: 1,
            gender: ['MALE', 'FEMALE'],
            collectionId: 3,
        },
    })

    const tshirt4 = await prisma.product.create({
        data: {
            name: 'Spray Print Ape Head Relaxed Fit Tee',
            categoryId: 1,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const tshirt5 = await prisma.product.create({
        data: {
            name: 'Color Camo Shark Tee',
            categoryId: 1,
            gender: ['MALE', 'FEMALE'],
            collectionId: 4,
        },
    })

    const pants1 = await prisma.product.create({
        data: {
            name: 'Color Camo Sweat Pants',
            categoryId: 4,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const pants2 = await prisma.product.create({
        data: {
            name: '1st Camo One Point Relaxed Fit Sweat Pants',
            categoryId: 4,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const pants3 = await prisma.product.create({
        data: {
            name: 'Shark Relaxed Fit Sweat Pants',
            categoryId: 4,
            gender: ['MALE', 'FEMALE'],
            collectionId: 5,
        },
    })

    const jeans1 = await prisma.product.create({
        data: {
            name: 'Shark Loose Fit 13 Oz Denim Pants',
            categoryId: 3,
            gender: ['MALE', 'FEMALE'],
            collectionId: 5,
        },
    })

    const jeans2 = await prisma.product.create({
        data: {
            name: 'Pearl Side Shark Relaxed Fit Denim Pants',
            categoryId: 3,
            gender: ['MALE', 'FEMALE'],
            collectionId: 4,
        },
    })

    const jeans3 = await prisma.product.create({
        data: {
            name: 'Mr. Bathing Ape Regular Fit Denim Jeans',
            categoryId: 3,
            gender: ['MALE', 'FEMALE'],
            collectionId: 6,
        },
    })

    const shorts1 = await prisma.product.create({
        data: {
            name: 'BAPE BLACK Paisley Leather Trimmed Worker Shorts',
            categoryId: 5,
            gender: ['MALE', 'FEMALE'],
            collectionId: 6,
        },
    })

    const shorts2 = await prisma.product.create({
        data: {
            name: 'Abc Camo One Point Relaxed Fit Water Shorts',
            categoryId: 5,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const shorts3 = await prisma.product.create({
        data: {
            name: 'BAPE BLACK Boro Paisley Camp Shorts',
            categoryId: 5,
            gender: ['MALE', 'FEMALE'],
            collectionId: 7,
        },
    })

    const jacket1 = await prisma.product.create({
        data: {
            name: 'Shark MA-1',
            categoryId: 6,
            gender: ['MALE', 'FEMALE'],
            collectionId: 7,
        },
    })

    const jacket2 = await prisma.product.create({
        data: {
            name: 'Shark Coach Jacket',
            categoryId: 6,
            gender: ['MALE', 'FEMALE'],
            collectionId: 7,
        },
    })

    const jacket3 = await prisma.product.create({
        data: {
            name: 'Ape Head Packable Jacket',
            categoryId: 6,
            gender: ['MALE', 'FEMALE'],
            collectionId: 5,
        },
    })

    const zip1 = await prisma.product.create({
        data: {
            name: 'Abc Camo Shark Full Zip Hoodie',
            categoryId: 2,
            gender: ['MALE', 'FEMALE'],
            collectionId: 2,
        },
    })

    const zip2 = await prisma.product.create({
        data: {
            name: '2nd Shark Full Zip Hoodie',
            categoryId: 2,
            gender: ['MALE', 'FEMALE'],
            collectionId: 6,
        },
    })

    const zip3 = await prisma.product.create({
        data: {
            name: 'BAPE X Straykids Leebit Shark Full Zip Hoodie',
            categoryId: 2,
            gender: ['MALE', 'FEMALE'],
            collectionId: 7,
        },
    })

    await prisma.productItem.createMany({
        data: [
            generateProductItem({
                productId: tshirt1.id,
                color: 'red',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKT-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'blue',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKK-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKK-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKK-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKK-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'green',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKM-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKM-pdp-2.jpg?v=1757648515&width=1200',
            }),
            generateProductItem({
                productId: tshirt1.id,
                color: 'green',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKM-pdp-1.jpg?v=1757648515&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX00610PBKM-pdp-2.jpg?v=1757648515&width=1200',
            }),


            generateProductItem({
                productId: tshirt2.id,
                color: 'purple',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-1.jpg?v=1755850505&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-2.jpg?v=1755850505&width=1200',
            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'purple',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-1.jpg?v=1755850505&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-2.jpg?v=1755850505&width=1200',
            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'purple',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-1.jpg?v=1755850505&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKS-pdp-2.jpg?v=1755850505&width=1200',

            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'blue',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKC-pdp-1.jpg?v=1755850504&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKC-pdp-2.jpg?v=1755850504&width=1200',
            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKC-pdp-1.jpg?v=1755850504&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKC-pdp-2.jpg?v=1755850504&width=1200',
            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKP-pdp-1.jpg?v=1755850505&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKP-pdp-2.jpg?v=1755850505&width=1200',
            }),
            generateProductItem({
                productId: tshirt2.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKP-pdp-1.jpg?v=1755850505&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017101PBKP-pdp-2.jpg?v=1755850505&width=1200',
            }),



            generateProductItem({
                productId: tshirt3.id,
                color: 'red',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PPKX-pdp-1.jpg?v=1757648446&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PPKX-pdp-2.jpg?v=1757648446&width=1200',
            }),
            generateProductItem({
                productId: tshirt3.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PPKX-pdp-1.jpg?v=1757648446&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PPKX-pdp-2.jpg?v=1757648446&width=1200',
            }),
            generateProductItem({
                productId: tshirt3.id,
                color: 'green',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PGRX-pdp-1.jpg?v=1757648446&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PGRX-pdp-2.jpg?v=1757648446&width=1200',
            }),
            generateProductItem({
                productId: tshirt3.id,
                color: 'green',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PGRX-pdp-1.jpg?v=1757648446&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM010091PGRX-pdp-2.jpg?v=1757648446&width=1200',
            }),



            generateProductItem({
                productId: tshirt4.id,
                color: 'red',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-2.jpg?v=1755244176&width=1200',
            }),
            generateProductItem({
                productId: tshirt4.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-2.jpg?v=1755244176&width=1200',
            }),
            generateProductItem({
                productId: tshirt4.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PRDX-pdp-2.jpg?v=1755244176&width=1200',
            }),
            generateProductItem({
                productId: tshirt4.id,
                color: 'blue',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-2.jpg?v=1755244176&width=1200',
            }),
            generateProductItem({
                productId: tshirt4.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-2.jpg?v=1755244176&width=1200',
            }),
            generateProductItem({
                productId: tshirt4.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-1.jpg?v=1755244176&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM334101PNYX-pdp-2.jpg?v=1755244176&width=1200',
            }),


            generateProductItem({
                productId: tshirt5.id,
                color: 'red',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PRDX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'blue',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PNYX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'purple',
                size: 'XS',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'purple',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-2.jpg?v=1755850479&width=1200',
            }),
            generateProductItem({
                productId: tshirt5.id,
                color: 'purple',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-1.jpg?v=1755850479&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEM017091PPPX-pdp-2.jpg?v=1755850479&width=1200',
            }),


            generateProductItem({
                productId: pants1.id,
                color: 'red',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PRDX-pdp-1.jpg?v=1755849867&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PRDX-pdp-2.jpg?v=1755849867&width=1200',
            }),
            generateProductItem({
                productId: pants1.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PRDX-pdp-1.jpg?v=1755849867&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PRDX-pdp-2.jpg?v=1755849867&width=1200',
            }),
            generateProductItem({
                productId: pants1.id,
                color: 'purple',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PPPX-pdp-1.jpg?v=1755849867&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PPPX-pdp-2.jpg?v=1755849867&width=1200',
            }),
            generateProductItem({
                productId: pants1.id,
                color: 'purple',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PPPX-pdp-1.jpg?v=1755849867&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM005521PPPX-pdp-2.jpg?v=1755849867&width=1200',
            }),


            generateProductItem({
                productId: pants2.id,
                color: 'green',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-1.jpg?v=1752827584&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-2.jpg?v=1752827584&width=1200',
            }),
            generateProductItem({
                productId: pants2.id,
                color: 'green',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-1.jpg?v=1752827584&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-2.jpg?v=1752827584&width=1200',
            }),
            generateProductItem({
                productId: pants2.id,
                color: 'green',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-1.jpg?v=1752827584&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM320521PGRX-pdp-2.jpg?v=1752827584&width=1200',
            }),


            generateProductItem({
                productId: pants3.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PBKX-pdp-1.jpg?v=1753454104&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PBKX-pdp-2.jpg?v=1753454104&width=1200',
            }),
            generateProductItem({
                productId: pants3.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PBKX-pdp-1.jpg?v=1753454104&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PBKX-pdp-2.jpg?v=1753454104&width=1200',
            }),
            generateProductItem({
                productId: pants3.id,
                color: 'white',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PGYX-pdp-1.jpg?v=1753454105&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PGYX-pdp-2.jpg?v=1753454105&width=1200',
            }),
            generateProductItem({
                productId: pants3.id,
                color: 'white',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PGYX-pdp-1.jpg?v=1753454105&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXPTM321521PGYX-pdp-2.jpg?v=1753454105&width=1200',
            }),


            generateProductItem({
                productId: jeans1.id,
                color: 'black',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PBKX-pdp-1.jpg?v=1751684617&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PBKX-pdp-2.jpg?v=1751684617&width=1200',
            }),
            generateProductItem({
                productId: jeans1.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PBKX-pdp-1.jpg?v=1751684617&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PBKX-pdp-2.jpg?v=1751684617&width=1200',
            }),
            generateProductItem({
                productId: jeans1.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PNYX-pdp-1.jpg?v=1751684618&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PNYX-pdp-2.jpg?v=1751684618&width=1200',
            }),
            generateProductItem({
                productId: jeans1.id,
                color: 'blue',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PNYX-pdp-1.jpg?v=1751684618&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM006501PNYX-pdp-2.jpg?v=1751684618&width=1200',
            }),


            generateProductItem({
                productId: jeans2.id,
                color: 'black',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-1.jpg?v=1747308678&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-2.jpg?v=1747308678&width=1200',
            }),
            generateProductItem({
                productId: jeans2.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-1.jpg?v=1747308678&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-2.jpg?v=1747308678&width=1200',
            }),
            generateProductItem({
                productId: jeans2.id,
                color: 'black',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-1.jpg?v=1747308678&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJNM150001NBKX-pdp-2.jpg?v=1747308678&width=1200',
            }),


            generateProductItem({
                productId: jeans3.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-1.jpg?v=1757673316&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-2.jpg?v=1757673316&width=1200',
            }),
            generateProductItem({
                productId: jeans3.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-1.jpg?v=1757673316&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-2.jpg?v=1757673316&width=1200',
            }),
            generateProductItem({
                productId: jeans3.id,
                color: 'blue',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-1.jpg?v=1757673316&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/MRBJNM301501PBLX-pdp-2.jpg?v=1757673316&width=1200',
            }),


            generateProductItem({
                productId: shorts1.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OBKX-pdp-1.jpg?v=1753785081&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OBKX-pdp-2.jpg?v=1753785081&width=1200',
            }),
            generateProductItem({
                productId: shorts1.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OBKX-pdp-1.jpg?v=1753785081&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OBKX-pdp-2.jpg?v=1753785081&width=1200',
            }),
            generateProductItem({
                productId: shorts1.id,
                color: 'white',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OIVX-pdp-1.jpg?v=1754021337&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OIVX-pdp-2.jpg?v=1754021337&width=1200',
            }),
            generateProductItem({
                productId: shorts1.id,
                color: 'white',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OIVX-pdp-1.jpg?v=1754021337&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153328OIVX-pdp-2.jpg?v=1754021337&width=1200',
            }),


            generateProductItem({
                productId: shorts2.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OBLX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OBLX-pdp-2.jpg?v=1749697758&width=1200',
            }),
            generateProductItem({
                productId: shorts2.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OBLX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OBLX-pdp-2.jpg?v=1749697758&width=1200',
            }),
            generateProductItem({
                productId: shorts2.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OPKX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OPKX-pdp-2.jpg?v=1749697758&width=1200',
            }),
            generateProductItem({
                productId: shorts2.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OPKX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OPKX-pdp-2.jpg?v=1749697758&width=1200',
            }),
            generateProductItem({
                productId: shorts2.id,
                color: 'green',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OGRX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OGRX-pdp-2.jpg?v=1749697758&width=1200',
            }),
            generateProductItem({
                productId: shorts2.id,
                color: 'green',
                size: 'XS',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OGRX-pdp-1.jpg?v=1749697758&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSPM153309OGRX-pdp-2.jpg?v=1749697758&width=1200',
            }),


            generateProductItem({
                productId: shorts3.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OBKA-pdp-1.jpg?v=1745490721&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OBKA-pdp-2.jpg?v=1745490721&width=1200',
            }),
            generateProductItem({
                productId: shorts3.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OBKA-pdp-1.jpg?v=1745490721&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OBKA-pdp-2.jpg?v=1745490721&width=1200',
            }),
            generateProductItem({
                productId: shorts3.id,
                color: 'white',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OWHB-pdp-1.jpg?v=1745490721&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OWHB-pdp-2.jpg?v=1745490721&width=1200',
            }),
            generateProductItem({
                productId: shorts3.id,
                color: 'white',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OWHB-pdp-1.jpg?v=1745490721&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/BBKSPM153329OWHB-pdp-2.jpg?v=1745490721&width=1200',
            }),


            generateProductItem({
                productId: jacket1.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PBKX-pdp-1.jpg?v=1757673144&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PBKX-pdp-2.jpg?v=1757673144&width=1200',
            }),
            generateProductItem({
                productId: jacket1.id,
                color: 'black',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PBKX-pdp-1.jpg?v=1757673144&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PBKX-pdp-2.jpg?v=1757673144&width=1200',
            }),
            generateProductItem({
                productId: jacket1.id,
                color: 'green',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PGRD-pdp-1.jpg?v=1757673144&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PGRD-pdp-2.jpg?v=1757673144&width=1200',
            }),
            generateProductItem({
                productId: jacket1.id,
                color: 'green',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PGRD-pdp-1.jpg?v=1757673144&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXJKM003411PGRD-pdp-2.jpg?v=1757673144&width=1200',
            }),


            generateProductItem({
                productId: jacket2.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-1.jpg?v=1755849783&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-3.jpg?v=1755849783&width=1200',
            }),
            generateProductItem({
                productId: jacket2.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-1.jpg?v=1755849783&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-3.jpg?v=1755849783&width=1200',
            }),
            generateProductItem({
                productId: jacket2.id,
                color: 'black',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-1.jpg?v=1755849783&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJMX00740PBKX-pdp-3.jpg?v=1755849783&width=1200',
            }),


            generateProductItem({
                productId: jacket3.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJM031821OBKX-pdp-1.jpg?v=1756451064&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJM031821OBKX-pdp-2.jpg?v=1756451064&width=1200',
            }),
            generateProductItem({
                productId: jacket3.id,
                color: 'black',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJM031821OBKX-pdp-1.jpg?v=1756451064&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXLJM031821OBKX-pdp-2.jpg?v=1756451064&width=1200',
            }),


            generateProductItem({
                productId: zip1.id,
                color: 'blue',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOBLX-pdp-1_b2dbf556-d9b1-4111-a1ad-31d1c1f47801.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOBLX-pdp-2_a9ec14d3-19d0-4c37-8ca7-a3fe9c369801.jpg?v=1760692294&width=1200',
            }),
            generateProductItem({
                productId: zip1.id,
                color: 'blue',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOBLX-pdp-1_b2dbf556-d9b1-4111-a1ad-31d1c1f47801.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOBLX-pdp-2_a9ec14d3-19d0-4c37-8ca7-a3fe9c369801.jpg?v=1760692294&width=1200',
            }),
            generateProductItem({
                productId: zip1.id,
                color: 'red',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOPKX-pdp-1_61564eeb-642e-48d8-a594-423e262de64e.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOPKX-pdp-2_a5b953e1-cd63-46ef-86de-39ce91c39ff1.jpg?v=1760692294&width=1200',
            }),
            generateProductItem({
                productId: zip1.id,
                color: 'red',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOPKX-pdp-1_61564eeb-642e-48d8-a594-423e262de64e.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOPKX-pdp-2_a5b953e1-cd63-46ef-86de-39ce91c39ff1.jpg?v=1760692294&width=1200',
            }),
            generateProductItem({
                productId: zip1.id,
                color: 'green',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOGRX-pdp-1_469f184f-c9e7-42bf-b68f-9caeda00ba54.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOGRX-pdp-2_45cf18d8-8433-4fe6-ab5d-04fa2422f91e.jpg?v=1760692294&width=1200',
            }),
            generateProductItem({
                productId: zip1.id,
                color: 'green',
                size: 'XS',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOGRX-pdp-1_469f184f-c9e7-42bf-b68f-9caeda00ba54.jpg?v=1760692294&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM00915XOGRX-pdp-2_45cf18d8-8433-4fe6-ab5d-04fa2422f91e.jpg?v=1760692294&width=1200',
            }),


            generateProductItem({
                productId: zip2.id,
                color: 'black',
                size: 'M',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NBKX-pdp-1.jpg?v=1737088368&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NBKX-pdp-3.jpg?v=1737088368&width=1200',
            }),
            generateProductItem({
                productId: zip2.id,
                color: 'black',
                size: 'XL',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NBKX-pdp-1.jpg?v=1737088368&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NBKX-pdp-3.jpg?v=1737088368&width=1200',
            }),
            generateProductItem({
                productId: zip2.id,
                color: 'green',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NGRX-pdp-1.jpg?v=1732259468&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NGRX-pdp-3.jpg?v=1732259468&width=1200',
            }),
            generateProductItem({
                productId: zip2.id,
                color: 'green',
                size: 'L',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NGRX-pdp-1.jpg?v=1732259468&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWMX15006NGRX-pdp-3.jpg?v=1732259468&width=1200',
            }),


            generateProductItem({
                productId: zip3.id,
                color: 'red',
                size: 'XS',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM919151PPKX-pdp-1.jpg?v=1764907421&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM919151PPKX-pdp-4.jpg?v=1764907421&width=1200',
            }),
            generateProductItem({
                productId: zip3.id,
                color: 'red',
                size: 'S',
                imageFrontUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM919151PPKX-pdp-1.jpg?v=1764907421&width=1200',
                imageBackUrl: 'https://int.bape.com/cdn/shop/files/0ZXSWM919151PPKX-pdp-4.jpg?v=1764907421&width=1200',
            }),
        ]
    });

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    'https://i.imgur.com/J5eU6QW.png',
            },
            {
                previewImageUrl:
                    'https://i.imgur.com/dY6k4wG.png',
            },
            {
                previewImageUrl:
                    'https://i.imgur.com/P428MRz.png',
            },
            {
                previewImageUrl:
                    'https://i.imgur.com/e0UvPOT.png',
            },
            {
                previewImageUrl:
                    'https://i.imgur.com/ve3JZ0K.png',
            },
            {
                previewImageUrl:
                    'https://i.imgur.com/nU0LNc8.png',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://i.imgur.com/YFOK3ur.png',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://i.imgur.com/0PRHlJF.png',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://i.imgur.com/PSnaBRc.png',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://i.imgur.com/RkF50vs.png',
            },
        ],
    });
}



async function down() {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Collection" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });