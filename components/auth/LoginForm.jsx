"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginForm() {
    const router = useRouter();
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        try {
            setLoading(true);
            
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setLoading(false);
                toast.error("Invalid email or password");
            } else {
                setLoading(false);
                toast.success("Logged in successfully");
                router.push("/dashboard/home/overview"); // Or wherever you want to redirect after login
            }
        } catch (error) {
            setLoading(false);
            console.error("Login Error:", error);
            toast.error("Something went wrong during login");
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
        >
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
                type="submit"
                disabled={loading}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Register
                </a>
            </p>
        </form>
    );
}