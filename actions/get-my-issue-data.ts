import prisma from "@/prisma/client";
import {IssueStatus} from "@prisma/client";

export const revalidate = 0;

export const getMyIssueData = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const issues = await prisma.issue.findMany({
            where: {
                createdByUserId: userId,
            }
        });

        const openIssues = await prisma.issue.count({
            where: {
                createdByUserId: userId,
                status: IssueStatus.OPEN
            }
        });
        const inProgressIssues = await prisma.issue.count({
            where: {
                createdByUserId: userId,
                status: IssueStatus.IN_PROGRESS
            }
        });

        const closedIssues = await prisma.issue.count({
            where: {
                createdByUserId: userId,
                status: IssueStatus.CLOSED
            }
        });

        return {
            issues,
            openIssues,
            inProgressIssues,
            closedIssues
        }
    } catch (e) {
        console.log("[GET_MY_ISSUES_DATA_ERROR]", e);
        return {
            issues: [],
            openIssues: 0,
            inProgressIssues: 0,
            closedIssues: 0
        }
    }
}