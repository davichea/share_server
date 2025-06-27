import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import index from "../../../components/npl/components/data/Table/TableHeaderCell";

export default function UserForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            users: [{ name: "", email: "", age: "", phone: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "users",
    });
    const onRemove =(index) =>{
        alert(index)
        remove(index)
    }
    const onSubmit = (data) => {
        console.log("Submitted data:", data);
    };

    // Reusable error message component
    const InputError = ({ error }) => {
        if (!error) return null;
        return (
            <span className="text-red-500 text-sm mt-1">
                {error.message || "This field is required"}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-700">User List</h2>

                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="border p-4 rounded-md bg-gray-50 relative"
                    >
                        <div className="mt-7 grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="flex flex-col">
                                <input
                                    {...register(`users.${index}.name`, {
                                        required: "Name is required",
                                    })}
                                    placeholder="Enter user name"
                                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError error={errors.users?.[index]?.name} />
                            </div>

                            {/* Age */}
                            <div className="flex flex-col">
                                <input
                                    {...register(`users.${index}.age`, {
                                        required: "Age is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Age must be a number",
                                        },
                                    })}
                                    placeholder="Enter age"
                                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError error={errors.users?.[index]?.age} />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <input
                                    {...register(`users.${index}.email`, {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    placeholder="Enter email"
                                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError error={errors.users?.[index]?.email} />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <input
                                    {...register(`users.${index}.phone`, {
                                        required: "Phone is required",
                                    })}
                                    placeholder="Enter phone"
                                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError error={errors.users?.[index]?.phone} />
                            </div>
                        </div>

                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={()=>onRemove(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-xl"
                            aria-label="Remove user"
                        >
                            ❌
                        </button>
                    </div>
                ))}

                <div className="flex justify-between gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            append({ name: "", email: "", age: "", phone: "" })
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        ➕ Add User
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        ✅ Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
