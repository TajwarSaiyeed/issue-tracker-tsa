import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import ViewIssueHeader from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-header";
import NotFound from "@/components/not-found";
import ViewIssueContent from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-content";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formattedDate} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface IParams {
    params: {
        issueId: string
    }
}

const ViewIssue = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);


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
                <Card className={'hidden md:block w-[300px] h-[150px]'}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Created By
                        </CardTitle>
                        <Avatar className={'bg-gray-200'}>
                            <AvatarImage src={issue.createdByUser.image!} alt={issue.createdByUser.name!}/>
                            <AvatarFallback>
                                {issue.createdByUser.name!.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {issue.createdByUser.name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Created {formattedDate(issue.createdAt as Date)} days ago
                        </p>
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