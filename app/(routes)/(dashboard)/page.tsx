import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import LatestIssues from "@/app/(routes)/(dashboard)/_components/latest-issues";
import {getIssues} from "@/actions/get-issues";
import IssueBadge from "@/components/issue-badge";
import {IssueStatus} from "@prisma/client";
import {getLatestIssues} from "@/actions/get-latest-issues";
import IssueGraph from "@/app/(routes)/(dashboard)/_components/issue-graph";
import {Metadata} from "next";

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
                <div className={'flex justify-between gap-x-2'}>
                    {issuesSummary.map(i => <Card key={i.title} className={"w-full"}>
                        <CardHeader>
                            <CardTitle className={'text-xl'}>
                                <IssueBadge
                                    status={i.title.split(" ").join("_").toUpperCase() as IssueStatus}
                                    classname={"px-2 py-1 rounded-md text-sm"}
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                {i.value}
                            </p>
                        </CardContent>
                    </Card>)}
                </div>
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

