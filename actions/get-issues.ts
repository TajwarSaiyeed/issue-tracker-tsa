import prisma from "@/prisma/client";
import {IssueStatus} from "@prisma/client";


export const getIssues = async () => {
    try {
        const issues = await prisma.issue.findMany();

        const openIssues = await prisma.issue.count({
            where: {
                status: IssueStatus.OPEN
            }
        });
        const inProgressIssues = await prisma.issue.count({
            where: {
                status: IssueStatus.IN_PROGRESS
            }
        });

        const closedIssues = await prisma.issue.count({
            where: {
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
        console.log("[GET_ISSUES_ERROR]", e);
        return {
            issues: [],
            openIssues: 0,
            inProgressIssues: 0,
            closedIssues: 0
        }
    }
}