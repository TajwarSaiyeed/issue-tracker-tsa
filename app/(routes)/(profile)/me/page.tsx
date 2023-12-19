import {Metadata} from "next";

const MyProfile = () => {
    return (
        <div>
            My Profile
        </div>
    )
}

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
    title: "My Profile",
    description: "My Profile",
}

export default MyProfile;



