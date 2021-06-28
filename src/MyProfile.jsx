import { useAuth } from "./auth/authContext";
export const MyProfile = () => {
    const { user } = useAuth();
    return (
        <div className="myprofile">
            <p>Name : {user}</p>
        </div>
    );
};
