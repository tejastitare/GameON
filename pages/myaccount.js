import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Make sure this logs the correct token

        console.log("Authorization Token:", token);
        if (!token) {
            router.push('/login'); // Redirect to login if not logged in
        } else {
            fetchUserData(token); // Pass the token to fetchUserData
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);

                if (data.success) {
                    setUserData(data.user); // Assuming the API returns { success: true, user: {name, email} }
                } else {
                    toast.error(data.error || 'Error fetching user data');
                }
            } else {
                console.error('Failed to fetch user data:', response.statusText);
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error fetching user data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                toast.success('Account updated successfully!');
            } else {
                toast.error('Error updating account');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            toast.error('Error updating account');
        }
    };

    return (
        <div className="container mx-auto my-12 text-black">
            <ToastContainer position="top-center" autoClose={1500} limit={5} hideProgressBar theme="light" />
            <h2 className="text-3xl font-bold mb-6">My Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4">
                    {loading ? 'Updating...' : 'Update Account'}
                </button>
            </form>
        </div>
    );
};

export default MyAccount;
