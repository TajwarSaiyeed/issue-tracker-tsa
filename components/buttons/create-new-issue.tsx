import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {getSession} from "@/lib/utils";

const CreateNewIssueButton = async () => {

    const session = await getSession()

    if (!session) return <Badge variant={"destructive"} className={'py-2 rounded-md'}>
        You must be signed in to create a new issue
    </Badge>

    return (
        <Link href={`/issues/new`}>
            <Button variant={"default"} size={"sm"} className={'bg-green-600 hover:bg-green-700'}>
                New Issue
            </Button>
        </Link>
    );
};

export default CreateNewIssueButton;