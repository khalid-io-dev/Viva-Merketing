import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/AuthService.tsx";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        image: null as File | null,
    });
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "image" && files) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    };

    useEffect(() => {
        if (authService.isAuthenticated()) {
            setLogged(true)
            setErrors({ general: "User already logged." });
            setTimeout(() => {
                navigate("/");
                setLogged(false)
                setErrors({});
            }, 5000)
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const data = new FormData();
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            data.append("name", fullName);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("password", formData.password);
            data.append("password_confirmation", formData.password_confirmation);
            if (formData.image) {
                data.append("image", formData.image);
            }

            console.log("Form state before submission:", formData);
            for (const [key, value] of data.entries()) {
                console.log(`FormData Entry: ${key} = ${value}`);
            }

            const response = await authService.register(data);
            console.log("Registration successful:", response);
            navigate("/");
        } catch (err: any) {
            console.error("Raw registration error:", err);
            try {
                const errorData = JSON.parse(err.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: err.message || "Registration failed. Please check your inputs." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row flex-grow justify-center items-center bg-gray-50 px-6 py-4 lg:px-8 w-full">
            {errors.email && (
                <div className="mb-4 text-red-600 text-center">
                    {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                </div>
            )}
            <div className="w-full md:max-w-3xl p-8 rounded-md" hidden={logged}>
                <div className="mx-auto w-full mb-10">
                    <h1 className="text-center text-5xl md:text-2xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8 w-full" encType="multipart/form-data">
                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="md:w-1/2">
                            <label
                                htmlFor="firstName"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.name && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                                </div>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <label
                                htmlFor="lastName"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.name && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="md:w-1/2">
                            <label
                                htmlFor="phone"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.phone && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.phone) ? errors.phone[0] : errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <label
                                htmlFor="email"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.email && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="md:w-1/2">
                            <label
                                htmlFor="password"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.password && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                                </div>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                                disabled={loading}
                            />
                            {errors.password_confirmation && (
                                <div className="mt-1 text-red-600 text-sm">
                                    {Array.isArray(errors.password_confirmation) ? errors.password_confirmation[0] : errors.password_confirmation}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full md:w-32 rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition disabled:bg-emerald-400"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-2xl md:text-sm text-gray-600">
                    Already a member?{" "}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-800">
                        Click here to sign in!
                    </Link>
                </p>
            </div>
        </div>
    );
}