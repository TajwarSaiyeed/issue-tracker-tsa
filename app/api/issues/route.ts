import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

import {createIssueSchema} from "@/schema/validationSchemas";
import {getSession} from "next-auth/react";


export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }
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