import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const sizes = await prisma.productItem.findMany({
        select: {
            size: true,
        },
        distinct: ['size']
    })

    const sizeValues = sizes.map((item) => item.size);

    return NextResponse.json(sizeValues);
}