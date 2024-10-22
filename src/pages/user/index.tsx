import { useEffect, useState } from "react";

type User = {
    email: string;
};
export default function User() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('http://localhost:9000/api/v1/auth/user', {
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': 'token',
                },                
                credentials: 'include',
            });
            if (res.ok) {
                const userData = await res.json();
                console.log(userData);
                setUser(userData);
            }
        } catch (error) {
            setUser(null);
        }
    };
    return (
        <div>
            {
                user ? (
                    <div>
                        <p>Welcome, {user.email}!</p>
                    </div>
                ) : (
                    <div>
                        <p>Please login</p>
                    </div>
                )
            }
        </div>
    )
}