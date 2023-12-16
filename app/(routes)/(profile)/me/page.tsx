import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Metadata} from "next";
import {getSession} from "@/lib/utils";
import Image from "next/image";

const MyProfile = async () => {
    const session = await getSession()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent className={'flex justify-between items-start'}>
                    <div>
                        <h1 className="text-2xl font-semibold">Name</h1>
                        <p className="text-gray-500">{session?.user?.name}</p>
                        <h1 className="text-2xl font-semibold">Email</h1>
                        <p className="text-gray-500">{session?.user?.email}</p>
                    </div>
                    <div>

                        <Image
                            src={session?.user?.image!}
                            alt="Picture of the author"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                </CardContent>

            </Card>
        </>
    );
};

export const metadata: Metadata = {
    title: "My Profile",
    description: "My Profile",
}

export default MyProfile;