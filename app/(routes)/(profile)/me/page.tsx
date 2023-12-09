import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Metadata} from "next";
import {getSession} from "@/lib/utils";

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