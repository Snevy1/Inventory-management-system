"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm() {
    const router = useRouter();
    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onBlur" // This ensures validation triggers when fields lose focus
    });

    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(""); // Fixed variable name from setEmail to setEmailErr

    async function onSubmit(data) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            setLoading(true);

            const response = await fetch(`${baseUrl}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                setLoading(false);
                toast.success("User Created Successfully");
                reset();
                router.push("/login");
            } else {
                setLoading(false);
                if (response.status === 409) {
                    setEmailErr("User with this Email already exists");
                    toast.error("User with this Email already exists");
                } else {
                    console.error("Server Error:", responseData.message);
                    toast.error("Oops Something went wrong");
                }
            }
        } catch (error) {
            setLoading(false);
            console.error("Network Error:", error);
            toast.error("Something went wrong, Please Try again");
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
        >
            <div>
                <label 
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your name
                </label>
                <input 
                    {...register("name", { 
                        required: "This field is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                        }
                    })}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                />
                {errors.name && (
                    <small className="text-red-600 text-sm">
                        {errors.name.message}
                    </small>
                )}
            </div>

            <div>
                <label 
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    {...register("email", { 
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                />
                {errors.email && (
                    <small className="text-red-600 text-sm">
                        {errors.email.message}
                    </small>
                )}
                {emailErr && (
                    <small className="text-red-600 text-sm">
                        {emailErr}
                    </small>
                )}
            </div>

            <div>
                <label 
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    {...register("password", { 
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••"
                />
                {errors.password && (
                    <small className="text-red-600 text-sm">
                        {errors.password.message}
                    </small>
                )}
            </div>

            <button
                type="submit" // Changed from type="button" to type="submit"
                disabled={loading}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {loading ? "Loading..." : "SignUp"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Login
                </a>
            </p>
        </form>
    );
}