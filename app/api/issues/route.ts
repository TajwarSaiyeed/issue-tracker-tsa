import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

import {createIssueSchema} from "@/schema/validationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export async function getSession() {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        // If there's an error, log it and return null to indicate no active session
        console.error("Error while fetching session:", error);
        return null;
    }
}
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