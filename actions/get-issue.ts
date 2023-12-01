import {Issue} from "@prisma/client";
import prisma from "@/prisma/client";

interface GetIssueResponse {
    issue: Issue | null;
    error: string | null;
}

export const getIssue = async (issueId: string | undefined): Promise<GetIssueResponse> => {
    try {
        if (!issueId) {
            return {
                issue: null,
                error: "Issue ID is missing"
            }
        }

        const issue = await prisma.issue.findUnique({
            where: {
                id: issueId
            }
        });

        return {
            issue,
            error: null
        }
    } catch (e) {
        console.log("[GET_ISSUE_ERROR]", e);
        return {
            issue: null,
            error: "Something went wrong"
        }
    }
}