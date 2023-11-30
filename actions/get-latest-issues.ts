import prisma from "@/prisma/client";

export const getLatestIssues = async () => {
    try {
        const latestIssues = await prisma.issue.findMany({
            take: 20,
            orderBy: {
                createdAt: "desc"
            }
        });

        return {
            latestIssues
        }

    } catch (error) {
        console.log("[GET_LATEST_ISSUE_ERROR]", error);
        return {
            latestIssues: []
        }
    }
}