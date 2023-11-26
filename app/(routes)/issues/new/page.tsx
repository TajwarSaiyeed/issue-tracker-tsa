'use client'
import {Button, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";

type IssueForm = {
    title: string;
    description: string;
}

const NewIssue = () => {
    const {register, control, handleSubmit} = useForm<IssueForm>()
    const router = useRouter()
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push('/issues')
            })}
            className={'max-w-xl space-y-3'}
        >
            <TextField.Root>
                <TextField.Input
                    {...register("title")}
                    placeholder={'Title'}/>
            </TextField.Root>

            <Controller
                control={control}
                name={'description'}
                render={({field}) => (<SimpleMDE placeholder="Description" {...field}/>)}
            />

            <Button>
                Submit New Issue
            </Button>
        </form>
    );
};

export default NewIssue;