import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function RegisterComplaint() {
    const router = useRouter();
    const [pin, setPin] = useState('');
    const [service, setService] = useState(false);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        sport: ''
    });

    // Check if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page if not logged in
            router.push('/login');
        }
    }, []);

    const checkServiceability = async () => {
        if (!pin) {
            toast.error('Please enter a valid Pin Code.');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
            const pinJson = await response.json();
            if (pinJson.includes(parseInt(pin))) {
                setService(true);
                toast.success('Your Pin Code is Serviceable!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                });
            } else {
                setService(false);
                toast.error('Sorry, Pin Code is not Serviceable!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            toast.error('Error checking serviceability');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.sport || !location) {
            toast.error('Please fill out all fields and ensure location is available.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    sport: formData.sport,
                    location: location
                }),
            });

            const data = await response.json();
            if (data?.message) {
                toast.success(data.message);
                window.location.href = `/press?sport=${formData.sport}`;
            } else {
                toast.error(data?.error || 'Error submitting form');
            }
        } catch (error) {
            toast.error('Error submitting form');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    toast.error('Unable to fetch location. Please try again later.');
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div className="container mx-auto my-12 text-black">
            <ToastContainer position="top-center" autoClose={1500} limit={5} hideProgressBar theme="light" />
            <h2 className="text-3xl font-bold mb-6">Register a Sport</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="sport" className="block text-gray-700 text-sm font-bold mb-2">Choose a Sport</label>
                    <select id="sport" name="sport" value={formData.sport} onChange={handleChange} className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500">
                        <option value="">Select a sport</option>
                        <option value="cricket">Cricket</option>
                        <option value="football">Football</option>
                        <option value="kabaddi">Kabaddi</option>
                        <option value="badminton">Badminton</option>
                    </select>
                </div>

                <div className="mb-4">
                    <input onChange={(e) => setPin(e.target.value)} type="text" className="p-2 border border-gray-300 rounded-md" placeholder="Enter Your Pin Code" />
                    <button onClick={checkServiceability} type="button" className="ml-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">Check Serviceability</button>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4">
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default RegisterComplaint;
