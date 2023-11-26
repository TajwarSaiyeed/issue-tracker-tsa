'use client'
import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {BiErrorCircle} from "react-icons/bi";

type IssueForm = {
    title: string;
    description: string;
}

const NewIssue = () => {
    const [error, setError] = useState('')
    const {register, control, handleSubmit} = useForm<IssueForm>()
    const router = useRouter()
    return (
        <div className={'max-w-xl'}>
            {error && <Callout.Root color={'red'} className={'mb-5'}>
                <Callout.Icon>
                    <BiErrorCircle />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError("An unexpected error occurred.")
                    }
                })}
                className={'space-y-3'}
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
        </div>
    );
};

export default NewIssue;