import prisma from "@/prisma/client";

export const revalidate = 0;

export const getLatestIssues = async () => {
    try {
        const latestIssues = await prisma.issue.findMany({
            take: 20,
            where: {
                status: {
                    in : ["OPEN", "IN_PROGRESS"]
                }
            },
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