import React from 'react';
import { menuItems } from '../../menuList'; // adjust path as needed
import useRouterStore from '../../globalStore/store';

export default function Sidebar() {
    const { setRoute } = useRouterStore();

    const handleChangeLink = (item) => {
        setRoute({
            link: item.link,
            breadcrumbs: [
                {
                    title: item.name,
                    link: item.link,
                },
            ],
        });
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-6">My Sidebar</h1>
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className="cursor-pointer hover:underline"
                        onClick={() => handleChangeLink(item)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
