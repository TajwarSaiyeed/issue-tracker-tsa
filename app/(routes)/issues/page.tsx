import {Metadata} from "next";
import {IssueQuery} from "@/types";
import prisma from "@/prisma/client";
import {IssueStatus} from "@prisma/client";

import {DataTable} from "@/components/data-table";
import {columns} from "@/components/columns";
import {Separator} from "@/components/ui/separator";

import CreateNewIssueButton from "@/components/buttons/create-new-issue";

export const revalidate = 1;
const IssuesPage = async ({searchParams}: { searchParams: IssueQuery }) => {
    const statuses = Object.values(IssueStatus);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const issues = await prisma.issue.findMany({
        where: {
            status: status
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div>
            <CreateNewIssueButton/>
            <Separator className={'my-4 max-w-7xl mx-auto'}/>
            <DataTable columns={columns} data={issues}/>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Issue List',
    description: 'View all project issues'
};

export default IssuesPage;