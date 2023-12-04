import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import ViewIssueHeader from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-header";
import NotFound from "@/components/not-found";
import ViewIssueContent from "@/app/(routes)/issues/issue/view/[issueId]/_components/view-issue-content";
import {Separator} from "@/components/ui/separator";

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
            <Separator className={'my-4 max-w-5xl mx-auto'} />
            <ViewIssueContent issue={issue}/>
        </section>
    );
};


export default ViewIssue;

export const metadata: Metadata = {
    title: 'Issue Tracker - View Issue',
    description: 'View issue details'
}