import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {getSession} from "@/app/api/issues/route";
import {Metadata} from "next";

const MyProfile = async () => {
    const session = await getSession()
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {session?.user?.name
                        ? `Welcome ${session?.user?.name}`
                        : "Welcome"}
                </CardTitle>
            </CardHeader>

        </Card>
    );
};

export const metadata: Metadata = {
    title: "My Profile",
    description: "My Profile",
}

export default MyProfile;