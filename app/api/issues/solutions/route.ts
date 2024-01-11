import {NextResponse} from "next/server";
import {getSession} from "@/lib/utils";
import {solutionIssueSchema} from "@/schema/validationSchemas";
import prisma from "@/prisma/client";


export const POST = async (req: Request) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const body = await req.json();

        const validated = solutionIssueSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json({error: validated.error}, {status: 400});
        }

        const findIssue = await prisma.issue.findFirst({
            where: {
                id: validated.data.issueId
            }
        })

        if (!findIssue) {
            return NextResponse.json({error: "Issue not found"}, {status: 404});
        }

        const findSolution = await prisma.solution.findFirst({
            where: {
                issueId: validated.data.issueId,
                userId: session.user.id
            }
        });

        if (findSolution) {
            return NextResponse.json({error: "Solution already exists"}, {status: 400});
        }


        const newSolution = await prisma.solution.create({
            data: {
                issueId: validated.data.issueId,
                data: validated.data.data,
                userId: session.user.id
            }
        });

        return NextResponse.json({
            message: "Solution created successfully",
            data: newSolution
        }, {status: 201});
    } catch (error: Error | any) {
        return NextResponse.json({error: "Something went wrong!"}, {status: 500})
    }
}