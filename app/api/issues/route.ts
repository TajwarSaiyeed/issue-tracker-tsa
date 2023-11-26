import {z} from 'zod';
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

const createIssueSchema =z.object({
    title: z.string().min(1, "Title is required!").max(255),
    description: z.string().min(1, "Description is required!")
})


export async function POST(req: NextRequest) {
    const body = await req.json();
    const validated = createIssueSchema.safeParse(body);

    if (!validated.success) {
        return NextResponse.json(validated.error.format(), {status: 400});
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })

    return NextResponse.json(newIssue, {status: 201});
}