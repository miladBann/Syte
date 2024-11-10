import React from "react";
import styles from "./profile.module.css";
import pic from "../../assets/boy.png";

interface User {
    user_id: number;
    username: string;
    email: string;
    created_at: string; 
}

interface profileProps {
    user: User;
}

const Profile: React.FC<profileProps> = ({user}) => {
    return (
        <div className={styles.profile_cont}>
            <figure>
                <img src={pic} alt="" />
            </figure>

            <p>{user.username}</p>
        </div>
    );
}

export default Profile;