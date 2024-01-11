import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formattedDate} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Issue, User} from "@prisma/client";

interface IViewIssueCreatedBy {
    issue: Issue & {
        createdByUser: User
    }
}

export const ViewIssueCreatedBy = ({issue}: IViewIssueCreatedBy) => {
    return (
        <Card className={'hidden lg:block w-[300px] h-[150px]'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Created By
                </CardTitle>
                <Avatar className={'bg-gray-200'}>
                    <AvatarImage src={issue?.createdByUser.image!} alt={issue?.createdByUser.name!}/>
                    <AvatarFallback>
                        {issue?.createdByUser.name!.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {issue?.createdByUser.name}
                </div>
                <p className="text-xs text-muted-foreground">
                    Created {formattedDate(issue.createdAt as Date)} days ago
                </p>
            </CardContent>
        </Card>
    );
};

