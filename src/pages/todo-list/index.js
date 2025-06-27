import React, { useState } from "react";
import {
    useForm,
    useFieldArray,
    FormProvider,
    useFormContext,
} from "react-hook-form";

// Reusable Error Message Component
function ErrorMessage({ message }) {
    if (!message) return null;
    return <p className="text-sm text-red-600 mt-1">{message}</p>;
}

// Reusable SelectField Component using useFormContext to get register & errors
function SelectField({ label, id, options, required = false, defaultValue }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <label className="block text-sm font-semibold mb-1" htmlFor={id}>
                {label} {required && "*"}
            </label>
            <select
                {...register(id, required ? { required: `${label} is required` } : {})}
                id={id}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:outline-none text-sm ${errors?.[id]?.message
                    ? "border-red-600 focus:ring-red-600"
                    : "border-gray-300 focus:ring-indigo-500"
                    }`}
                defaultValue={defaultValue || ""}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <ErrorMessage message={errors?.[id]?.message} />
        </div>
    );
}

// Options arrays for select fields
const PRIORITY_OPTIONS = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
];

const STATUS_OPTIONS = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
];

const FLEXIBILITY_OPTIONS = [
    { value: "Strict", label: "Strict" },
    { value: "Normal", label: "Normal" },
    { value: "Flexible", label: "Flexible" },
];

// Default task object
const defaultTask = {
    description: "",
    priority: "Medium",
    dueDate: "",
    category: "",
    status: "Pending",
    timeEstimate: "",
    notes: "",
    reminder: false,
    flexibility: "Normal",
    motivation: "",
};

function TaskItem({ field, index, remove }) {
    const {  register, formState: { errors }} = useFormContext();

    return (
        <div
            key={field.id}
            className="relative bg-white rounded-lg shadow p-6 mb-8 border border-gray-200"
        >
            <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold"
                title="Remove task"
            >
                &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.description`}
                    >
                        Task Description *
                    </label>
                    <textarea
                        {...register(`tasks.${index}.description`, {
                            required: "Task description is required",
                            minLength: {
                                value: 5,
                                message: "Description must be at least 5 characters",
                            },
                        })}
                        id={`tasks.${index}.description`}
                        placeholder="Describe the task..."
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none resize-none text-sm ${errors?.tasks?.[index]?.description
                            ? "border-red-600 focus:ring-red-600"
                            : "border-gray-300 focus:ring-indigo-500"
                            }`}
                        rows={3}
                        defaultValue={field.description}
                    />
                    <ErrorMessage message={errors?.tasks?.[index]?.description?.message} />
                </div>

                {/* Priority select */}
                <SelectField
                    label="Priority"
                    id={`tasks.${index}.priority`}
                    options={PRIORITY_OPTIONS}
                    required
                    defaultValue={field.priority}
                />

                {/* Due Date */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.dueDate`}
                    >
                        Due Date *
                    </label>
                    <input
                        type="date"
                        {...register(`tasks.${index}.dueDate`, {
                            required: "Due date is required",
                        })}
                        id={`tasks.${index}.dueDate`}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:outline-none text-sm ${errors?.tasks?.[index]?.dueDate
                            ? "border-red-600 focus:ring-red-600"
                            : "border-gray-300 focus:ring-indigo-500"
                            }`}
                        defaultValue={field.dueDate}
                    />
                    <ErrorMessage message={errors?.tasks?.[index]?.dueDate?.message} />
                </div>

                {/* Category */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.category`}
                    >
                        Category / Grouping
                    </label>
                    <input
                        type="text"
                        {...register(`tasks.${index}.category`)}
                        id={`tasks.${index}.category`}
                        placeholder="e.g. Work, Personal"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm border-gray-300"
                        defaultValue={field.category}
                    />
                </div>

                {/* Status select */}
                <SelectField
                    label="Status"
                    id={`tasks.${index}.status`}
                    options={STATUS_OPTIONS}
                    required
                    defaultValue={field.status}
                />

                {/* Time Estimate */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.timeEstimate`}
                    >
                        Time Estimate
                    </label>
                    <input
                        type="text"
                        {...register(`tasks.${index}.timeEstimate`)}
                        id={`tasks.${index}.timeEstimate`}
                        placeholder="e.g. 2 hours"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm border-gray-300"
                        defaultValue={field.timeEstimate}
                    />
                </div>

                {/* Additional Notes */}
                <div className="col-span-2">
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.notes`}
                    >
                        Additional Notes / Details
                    </label>
                    <textarea
                        {...register(`tasks.${index}.notes`)}
                        id={`tasks.${index}.notes`}
                        placeholder="Any extra details..."
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-sm border-gray-300"
                        rows={2}
                        defaultValue={field.notes}
                    />
                </div>

                {/* Reminder */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        {...register(`tasks.${index}.reminder`)}
                        id={`tasks.${index}.reminder`}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        defaultChecked={field.reminder}
                    />
                    <label
                        htmlFor={`tasks.${index}.reminder`}
                        className="text-sm font-medium text-gray-700"
                    >
                        Set Reminder/Notification
                    </label>
                </div>

                {/* Flexibility select */}
                <SelectField
                    label="Flexibility"
                    id={`tasks.${index}.flexibility`}
                    options={FLEXIBILITY_OPTIONS}
                    defaultValue={field.flexibility}
                />

                {/* Motivation */}
                <div>
                    <label
                        className="block text-sm font-semibold mb-1"
                        htmlFor={`tasks.${index}.motivation`}
                    >
                        Motivational Elements
                    </label>
                    <input
                        type="text"
                        {...register(`tasks.${index}.motivation`)}
                        id={`tasks.${index}.motivation`}
                        placeholder="E.g. Rewards, Goals"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm border-gray-300"
                        defaultValue={field.motivation}
                    />
                </div>
            </div>
        </div>
    );
}

export function TaskTable({ tasks = [] }) {
    if (!tasks.length) {
        return <p className="text-gray-500 text-center">No tasks found.</p>;
    }

    return (
        <TableContainer>
            <TableHead />
            <TableBody tasks={tasks} />
        </TableContainer>
    );
}

// 🔷 Table container
function TableContainer({ children }) {
    return (
        <div className="overflow-auto rounded-lg border border-gray-200   shadow w-full h-[400px]">
            <table className="min-w-full divide-y divide-gray-200  ">{children}</table>
        </div>
    );
}

// 🔷 Table head
function TableHead() {
    return (
        <thead className="bg-gray-50 sticky top-0">
            <tr>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Time</TableHeaderCell>
                <TableHeaderCell>Notes</TableHeaderCell>
                <TableHeaderCell>Reminder</TableHeaderCell>
                <TableHeaderCell>Flexibility</TableHeaderCell>
                <TableHeaderCell>Motivation</TableHeaderCell>
            </tr>
        </thead>
    );
}

// 🔷 Table body
function TableBody({ tasks }) {
    return (
        <tbody className="divide-y divide-gray-100 ">
            {tasks.map((task, index) => (
                <TableRow key={index} task={task} index={index} />
            ))}
        </tbody>
    );
}

// 🔷 Table row
function TableRow({ task, index }) {
    return (
        <tr className="hover:bg-gray-50">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>{task.category}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.timeEstimate}</TableCell>
            <TableCell>{task.notes}</TableCell>
            <TableCell>{task.reminder ? "Yes" : "No"}</TableCell>
            <TableCell>{task.flexibility}</TableCell>
            <TableCell>{task.motivation}</TableCell>
        </tr>
    );
}

// 🔷 Table header cell
function TableHeaderCell({ children }) {
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-normal break-words min-w-[120px]"
    >
      {children}
    </th>
  );
}


// 🔷 Table cell
function TableCell({ children }) {
    return <td className="px-4 py-3 text-sm text-gray-700">{children}</td>;
}

export default function TaskForm() {
    const [submittedTasks, setSubmittedTasks] = useState([]);

    const methods = useForm({
        defaultValues: { tasks: [defaultTask] },
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "tasks",
    });

    const onSubmit = (data) => {
        setSubmittedTasks((prev) => [...prev, ...data.tasks]);
    };


    return (
        <FormProvider {...methods}>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Left side - Form */}
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="w-full lg:w-1/2 space-y-8 bg-white rounded-lg shadow-lg p-8"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Task List</h2>

                    {fields.map((field, index) => (
                        <TaskItem key={field.id} field={field} index={index} remove={remove} />
                    ))}

                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <button
                            type="button"
                            onClick={() => append(defaultTask)}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
                        >
                            + Add Task
                        </button>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
                        >
                            Submit Tasks
                        </button>
                    </div>
                </form>

                {/* Right side - Table */}
                <div className="w-full lg:w-1/2 space-y-8 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Submitted Tasks</h2>
                    <TaskTable tasks={submittedTasks} />
                </div>
            </div>
        </FormProvider>

    );
}
