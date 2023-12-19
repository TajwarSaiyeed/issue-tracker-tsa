import {FC} from "react";
import {IssueStatus} from "@prisma/client";

import {issuesSummaryProps} from "@/types";
import IssueBadge from "@/components/issue-badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const IssueSummary: FC<issuesSummaryProps> = ({issuesSummary}) => {
    return (
        <div className={'flex flex-col gap-y-2 sm:flex-row justify-between gap-x-2 my-2'}>
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
    );
};

export default IssueSummary;