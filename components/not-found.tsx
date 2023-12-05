import {FaBug} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const NotFound = ({
                      title = "Issue not found",
                      description = "The issue you are looking for does not exist",
                      href,
                      btnText = "Back to issues"
                  }: {
    title?: string,
    description?: string
    href: string
    btnText: string
}) => {
    return (
        <div className={'flex flex-col justify-center items-center gap-y-5'}>
            <FaBug className={'text-7xl text-gray-400'}/>
            <h1
                className={'text-2xl font-bold text-gray-900 text-center tracking-wide uppercase'}
            >{title}</h1>
            <p
                className={'text-sm text-gray-400'}
            >{description}</p>

            <Link href={href}>
                <Button variant={"destructive"}>
                    {btnText}
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;