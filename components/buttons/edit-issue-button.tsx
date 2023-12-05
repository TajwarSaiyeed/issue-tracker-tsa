import React from 'react';
import {Button} from "@/components/ui/button";
import {BiEdit, BiEditAlt} from "react-icons/bi";
import Link from "next/link";
import {getSession} from "@/app/api/issues/route";

type EditIssueButtonProps = {
    userId: string
    issueId: string
    buttonType: 'icon' | 'text'
}

const EditIssueButton = async ({userId, issueId, buttonType}: EditIssueButtonProps) => {
    const session = await getSession()

    if (!session) return null

    if (session.user.id !== userId) return null

    if (buttonType === 'icon') {
        return (
            <Link href={`/issues/issue/edit/${issueId}`}>
                <Button variant={'outline'} size={'icon'}>
                    <BiEdit className={'w-5 h-5'}/>
                </Button>
            </Link>
        );
    }
    return (
        <Link href={`/issues/issue/edit/${issueId}`}>
            <Button size={'sm'}>
                Edit This Issue
            </Button>
        </Link>
    );
};

export default EditIssueButton;