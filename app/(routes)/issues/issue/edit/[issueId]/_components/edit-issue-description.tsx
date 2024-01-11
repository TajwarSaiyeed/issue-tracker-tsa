'use client';
import {useForm} from "react-hook-form";
import {UpdateIssueDescriptionSchema} from "@/schema/validationSchemas";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Issue} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Editor from "@/components/editor";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";

type EditIssueDescriptionProps = {
    issue: Issue
}

export type UpdateIssueDescriptionType = z.infer<typeof UpdateIssueDescriptionSchema>;

export const EditIssueDescription = ({issue}: EditIssueDescriptionProps) => {
    const router = useRouter()
    const form = useForm<UpdateIssueDescriptionType>({
        resolver: zodResolver(UpdateIssueDescriptionSchema),
        defaultValues: {
            description: issue.description
        }
    })

    const editorContent = form.getValues('description');


    useEffect(() => {
        form.setValue('description', form.getValues('description'), {
            shouldValidate: true,
        });
    }, [form, editorContent]);
    const onDescriptionChange = (value: string) => {
        form.setValue('description', value, {
            shouldValidate: true,
        });
    };

    const handleUpdateDescription = async (values: UpdateIssueDescriptionType) => {
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
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Issue Description
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleUpdateDescription)} className={'space-y-4'}>
                        <FormField
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor value={form.getValues('description')} onChange={onDescriptionChange}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            name={"description"}
                        />
                        <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type={'submit'}
                                variant={'default'}>
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

