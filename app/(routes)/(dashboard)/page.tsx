import {Metadata} from "next";

import IssueSummary from "@/components/issue-summary";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import IssueGraph from "./_components/issue-graph";
import LatestIssues from "./_components/latest-issues";

import {getIssues} from "@/actions/get-issues";
import {getLatestIssues} from "@/actions/get-latest-issues";

export const revalidate = 0;

export default async function Home() {
    const {openIssues, inProgressIssues, closedIssues} = await getIssues()
    const {latestIssues} = await getLatestIssues()

    const issuesSummary = [
        {
            title: 'Open',
            value: openIssues
        },
        {
            title: 'In Progress',
            value: inProgressIssues
        },
        {
            title: 'Closed',
            value: closedIssues
        }
    ]


    return (
        <section className={'flex flex-col lg:flex-row space-y-5 lg:space-y-0 justify-between gap-x-6'}>
            <Card className={'w-full p-5 md:flex-1'}>
                <IssueSummary issuesSummary={issuesSummary}/>
                <IssueGraph OpenIssues={openIssues} InProgressIssues={inProgressIssues} ClosedIssues={closedIssues}/>
            </Card>
            <Card className={'w-full p-2 lg:w-[500px]'}>
                <CardHeader>
                    <CardTitle className={'text-xl'}>
                        Latest Issues
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LatestIssues
                        issues={latestIssues}

                    />
                </CardContent>
            </Card>
        </section>

    )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
}

