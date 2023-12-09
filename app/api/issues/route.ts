import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

import {createIssueSchema} from "@/schema/validationSchemas";
import {getSession} from "@/lib/utils";

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
            title: validated.data.title,
            description: validated.data.description,
            createdByUserId: session.user.id,
        }
    })

    return NextResponse.json(newIssue, {status: 201});
}