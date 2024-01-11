'use client'

import {Issue, IssueStatus} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import IssueBadge from "@/components/issue-badge";
import {formattedDate} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {UpdateIssueHeaderSchema} from "@/schema/validationSchemas";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";

type IssueHeaderProps = {
    issue: Issue
}
export const EditIssueHeader = ({issue}: IssueHeaderProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex justify-between items-center'}>
                    {issue?.title}
                    <UpdateIssueHeader issue={issue}/>
                </CardTitle>
            </CardHeader>
            <CardContent className={'flex gap-x-2'}>
                <IssueBadge status={issue?.status} classname={'rounded-md'}/>
                <p className={'text-sm text-gray-400'}>
                    {(issue?.status === "OPEN" || issue?.status === "IN_PROGRESS") ?
                        `created ${formattedDate(issue?.createdAt as Date)} days ago`
                        : `was closed ${formattedDate(issue?.updatedAt as Date)} days ago`}
                </p>
            </CardContent>
        </Card>
    );
};

type UpdateIssueHeaderType = z.infer<typeof UpdateIssueHeaderSchema>
const UpdateIssueHeader = ({issue}: IssueHeaderProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(UpdateIssueHeaderSchema),
        defaultValues: {
            title: issue?.title,
            status: issue?.status as IssueStatus
        }
    })

    const handleSubmit = async (values: UpdateIssueHeaderType) => {
        try {
            await axios.patch(`/api/issues/${issue?.id}`, values);
            toast.success("Updated", {
                duration: 2000,
                position: "top-right",
                description: "Issue updated successfully",
            });
        } catch (e: Error | any) {
            console.log(e);
        } finally {
            router.refresh();
            setOpen(false);
        }
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button
                onClick={() => setOpen(true)}
                variant={'outline'} size={'sm'}>
                Update
            </Button>
        </DialogTrigger>
        {open && <DialogContent className={'space-y-4'}>
            <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-4'}>
                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Title"
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter a title for the issue
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name={'title'}
                    />
                    <FormField
                        control={form.control}
                        render={({field}) => (
                            <FormItem className={'w-full'}>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value: IssueStatus) => field.onChange(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status"/>
                                        </SelectTrigger>
                                        <SelectContent className={'w-full'}>
                                            <SelectItem value={IssueStatus.OPEN}>
                                                Open
                                            </SelectItem>
                                            <SelectItem value={IssueStatus.IN_PROGRESS}>
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value={IssueStatus.CLOSED}>
                                                Closed
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Select the status of the issue
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        name={'status'}
                    />
                    <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type={'submit'}
                            variant={'default'}>
                        Update
                    </Button>
                </form>
            </Form>
        </DialogContent>}
    </Dialog>

}

