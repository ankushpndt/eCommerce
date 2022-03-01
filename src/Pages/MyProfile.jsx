import { useAuth } from "../Context/authContext";
export const MyProfile = () => {
    const { user } = useAuth();
    return (
        <div className="myprofile">
            <p>Name : {user}</p>
        </div>
    );
};
