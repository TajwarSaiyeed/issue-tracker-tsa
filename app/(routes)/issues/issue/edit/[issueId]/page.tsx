import {getIssue} from "@/actions/get-issue";
import {Metadata} from "next";

interface IParams {
    params: {
        issueId: string
    }
}

const ViewIssue = async ({params: {issueId}}: IParams) => {
    const {issue} = await getIssue(issueId);
    return (
        <div>
            Hello world {issue?.title}
        </div>
    );
};


export default ViewIssue;

export const metadata: Metadata = {
    title: 'Issue Tracker - View Issue',
    description: 'View issue details'
}