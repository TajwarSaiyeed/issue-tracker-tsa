import {redirect} from "next/navigation";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {cn, getSession} from "@/lib/utils";
import ProfileHeader from "./components/profile-header"
import {toast} from "sonner";
import ProfileLink from "@/app/(routes)/(profile)/components/profile-link";
import {Separator} from "@/components/ui/separator";
import {getMyIssueData} from "@/actions/get-my-issue-data";

const ProfileLayout = async ({children}: {
    children: React.ReactNode
}) => {
    const data = await getSession()

    const links = [
        {
            name: "My Issues",
            href: "/my-issues"
        }
    ]

    if (!data) {
        toast.error("You must be logged in to view this page.")
        return redirect('/')
    }

    const {openIssues, inProgressIssues, closedIssues} = await getMyIssueData(data?.user?.id);

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
        <>
            {data && <ProfileHeader user={data?.user} issuesSummary={issuesSummary}/>}
            <div className='relative mt-4'>
                <ScrollArea className="max-w-[600px] lg:max-w-none">
                    <div className={cn("mb-4 flex items-center")}>
                        {links.map((link) => (
                            <ProfileLink key={link.name} link={link}/>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible"/>
                </ScrollArea>
                <Separator className="mb-4"/>
                <>
                    {children}
                </>
            </div>
        </>
    );
};

export default ProfileLayout;




