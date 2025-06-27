import axios from 'axios';
import { useState } from 'react';

export async function getServerSideProps() {
    try {
        const res = await axios.get('https://dummyjson.com/users/1');
        const user = res.data;

        return {
            props: {
                user,
            },
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return {
            props: {
                user: null,
            },
        };
    }
}

export default function UserPage({ user }) {
    const [showEmail, setShowEmail] = useState(false);

    if (!user) {
        return <div className="p-6 text-red-500">Failed to load user data.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">👤 User Info</h1>

                <p><span className="font-semibold text-gray-600">Name:</span> {user.firstName} {user.lastName}</p>

                {showEmail && (
                    <p><span className="font-semibold text-gray-600">Email:</span> {user.email}</p>
                )}

                <p><span className="font-semibold text-gray-600">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold text-gray-600">Location:</span> {user.address.city}, {user.address.state}</p>

                <button
                    onClick={() => setShowEmail(prev => !prev)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                    {showEmail ? 'Hide Email' : 'Show Email'}
                </button>
            </div>
        </div>
    );
}
