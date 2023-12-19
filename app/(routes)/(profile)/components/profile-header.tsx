'use client'
import {Card} from "@/components/ui/card";
import IssueSummary from "@/components/issue-summary";

type ProfileHeaderProps = {
    user: {
        id: string;
    } & {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    issuesSummary: {
        title: string;
        value: number;
    }[];
};

const ProfileHeader = ({user, issuesSummary}: ProfileHeaderProps) => {
    return (
        <Card className={"p-4 flex flex-col justify-between gap-2"}>
            <h1 className="text-left text-xl sm:text-3xl font-bold">Welcome, {user?.name}</h1>
            <IssueSummary issuesSummary={issuesSummary}/>
        </Card>
    );
};

export default ProfileHeader;
