import {Button} from "@/components/ui/button";
import Link from "next/link";

const CreateNewIssueButton = () => {
    return (
        <Link href={`/issues/new`}>
            <Button variant={"default"} size={"sm"} className={'bg-green-600 hover:bg-green-700'}>
                New Issue
            </Button>
        </Link>
    );
};

export default CreateNewIssueButton;