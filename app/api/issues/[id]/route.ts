import {NextResponse} from "next/server";
import {UpdateIssueHeaderSchema} from "@/schema/validationSchemas";
import prisma from "@/prisma/client";
import {getSession} from "@/lib/utils";

export async function PATCH(req: Request, {params}: {
    params: {
        id: string
    }
}) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const body = await req.json();
        const validated = UpdateIssueHeaderSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(validated.error.format(), {status: 400});
        }

        const updatedIssue = await prisma.issue.update({
            where: {
                id: params.id
            },
            data: {
                title: validated.data.title,
                status: validated.data.status
            }
        })

        return NextResponse.json(updatedIssue, {status: 200});
    } catch (e) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}