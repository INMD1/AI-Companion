import { useUser } from "@clerk/nextjs"
import { AvatarImage,Avatar } from "./ui/avatar";

export const UserAvatar = () => {
    const {user } = useUser();

    return(
        <Avatar className="h-12 w-12">
            <AvatarImage src={user?.profileImageUrl}/>
        </Avatar>
    )
}