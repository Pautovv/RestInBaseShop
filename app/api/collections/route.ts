import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET() {
    const collections = await prisma.collection.findMany();

    return NextResponse.json(collections)
}