import {Metadata} from "next";
import {getIssue} from "@/actions/get-issue";
import ViewIssueHeader from "./_components/view-issue-header";
import NotFound from "@/components/not-found";
import ViewIssueContent from "./_components/view-issue-content";
import {Separator} from "@/components/ui/separator";
import {ViewIssueCreatedBy} from "./_components/view-issue-created-by";
import {IssueSolutions} from "./_components/issue-solutions";

export const dynamic = 'force-dynamic';

export const revalidate = 1;

interface IParams {
    params: {
        issueId: string
    }
}

export const generateMetadata = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);

    if (!issue) {
        return {
            title: 'Issue Tracker - View Issue',
            description: 'View issue details'
        };
    }

    return {
        title: issue.title,
        description: issue.description
    };
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
                <ViewIssueCreatedBy issue={issue}/>
            </div>
            <Separator className={'my-4 max-w-5xl mx-auto'}/>
            <IssueSolutions issueId={issue.id}/>
        </section>
    );
};


export default ViewIssue;