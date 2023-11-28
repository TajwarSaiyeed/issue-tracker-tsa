import {Metadata} from "next";
import Link from "next/link";
import {IssueQuery} from "@/types";
import prisma from "@/prisma/client";
import {IssueStatus} from "@prisma/client";
import IssueTable from "./_components/issue-table";

const IssuesPage = async ({searchParams}: { searchParams: IssueQuery }) => {
    const statuses = Object.values(IssueStatus);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;
    const where = {status};


    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10

    const issues = await prisma.issue.findMany({
        where,
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    })

    const issueCount = await prisma.issue.count({where});

    return (
        <div>
            <button>
                <Link href={`/issues/new`}>
                    New Issue
                </Link>
            </button>

            {/*issuestable*/}
        </div>
    );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Issue List',
    description: 'View all project issues'
};

export default IssuesPage;