import { useState, useEffect } from "react";
import axios from "axios";


interface User {
    user_id: number;
    username: string;
    email: string;
    created_at: string; 
}


const useUser = (userId: number) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null); 
                const response = await axios.get<User>(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError("Failed to fetch user data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, error, loading };
};

export default useUser;
