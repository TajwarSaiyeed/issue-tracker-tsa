import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import ViewIssueHeader from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-header";
import NotFound from "@/components/not-found";
import ViewIssueContent from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-content";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";

interface IParams {
    params: {
        issueId: string
    }
}

const ViewIssue = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);
    const user = issue?.createdByUser;


    if (!issue) {
        return (
            <NotFound href={'/issues'} btnText={"Back to issue"}/>
        );
    }

    return (
        <section>
            <ViewIssueHeader issue={issue}/>
            <Separator className={'my-4 max-w-5xl mx-auto'}/>
            <div className={'flex gap-2'}>

                    <ViewIssueContent issue={issue}/>
                {/*TODO: USER Details
                    user Image
                    user name
                    created at
                */}
                <Card className={'w-[300px]'}>
                    <CardContent>
                        <div className={'rounded-full border-1 w-8 h-8'}>
                            <Image width={100} height={100} src={user?.image} alt={user?.name}/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};


export default ViewIssue;

export const metadata: Metadata = {
    title: 'Issue Tracker - View Issue',
    description: 'View issue details'
}