import {Metadata} from "next";
import {redirect} from "next/navigation";
import {toast} from "sonner";

import {columns} from "@/components/columns";
import {DataTable} from "@/components/data-table";

import {getSession} from "@/lib/utils";

import {getMyIssueData} from "@/actions/get-my-issue-data";

const MyIssues = async () => {
    const data = await getSession()
    if (!data) {
        toast.error("Error", {
            duration: 2000,
            position: "top-right",
            description: "You must be logged in to view this page.",
        });
        return redirect('/')
    }
    const {issues} = await getMyIssueData(data?.user?.id);
    return (
        <>
            <DataTable columns={columns} data={issues}/>
        </>
    );
};

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "My Issues - Track and Manage Your Tasks",
    description: "View and manage your assigned issues. Stay organized and track your progress on various tasks.",
    keywords: "my issues, issues, tasks, track, manage, progress, assigned, open, in progress, closed"
};
export default MyIssues;