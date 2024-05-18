import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`http://localhost:9000/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json(); // Parse response body as JSON

        console.log('Logout response:', responseData);

        if (response.ok && responseData.data === null) { // Check if response is OK and data is null
            localStorage.removeItem('token'); // Remove token from localStorage
            window.location.href = '/login'; // Redirect to login page
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};








    return (
        <div className='bg-white relative'>
            {/* Logout button */}
            <button onClick={handleLogout} className="absolute top-0 left-0 p-4 text-gray-600 hover:text-gray-800">Logout</button>
            {/* Navbar */}
            <Navbar />
            {/* Main content */}
            <div className='w-screen flex container mx-auto' style={{ height: 'calc(100vh - 56px)' }}>
                <div className="w-[220px]">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <div className="flex flex-col items-center justify-center h-full">
                        {/* Your content goes here */}
                        {children}
                        {/* Additional content */}
                        <div className="mt-10">
                            <h1 className="text-4xl font-bold mb-4">Home Challenge</h1>
                            <div className="flex flex-col items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/9402/9402341.png" className="w-20" alt="" />
                                <h1 className="text-lg mt-2">Select or create new project</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppLayout;
