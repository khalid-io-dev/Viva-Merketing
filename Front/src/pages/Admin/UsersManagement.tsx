import {useEffect, useState} from "react";
import {makeAuthenticatedRequest, API_URL} from "../../services/Requests.tsx";
import {authService} from "../../services/AuthService.tsx";

interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    password: string;
}

export default function UsersManagement(){

    const[users, setUsers] = useState<User[]>([])
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);
    const [modal, setModalOpen] = useState(false);
    const admin = authService.isAdmin();
    const [selecteduser, setSelectedUser] = useState<User>()


    /* check admin access */
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            setErrors({ general: "Please log in to access this page" });
        } else if (!authService.isAdmin()) {
            setErrors({ general: "Unauthorized: Admin access required" });
        }
    }, []);

    const handleDeleteUser = async (id: number) => {
        if (!confirm("Do you really want to delete this user ?")) return;
        if (!admin) return;
        try {
            setLoading(true);
            await makeAuthenticatedRequest(`${API_URL}/users/` + id, { method: "DELETE" });
            await fetchUsers();
            alert("User deleted !");
        } catch (error: any) {
            console.error("Failed to delete user:", error);
            setErrors({ general: error.message || "Failed to delete user" });
        } finally {
            setLoading(false);
        }
    }

    const fetchUsers = async () => {
        if (!admin) return
        try {
            const FetchUrl = "/users";
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}` + FetchUrl);
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setErrors({ general: "Failed to load user" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

return (
    <section className="antialiased  p-12 w-full h-full">
        {loading && (
            <div className="text-center">
                <div className="inline-flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-slate-600 font-medium">Loading users...</span>
                </div>
            </div>
        )}

        {!loading && !users && (
            <div className="text-center text-gray-600">No user found.</div>
        )}

        {!loading && users && (
            <div className="mx-auto max-w-5xl">
                {/* Error Message */}
                {errors.general && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 rounded-xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Array.isArray(errors.general) ? errors.general[0] : errors.general}
                        </div>
                    </div>
                )}
                <div className="pb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r  from-slate-800 text-gray-50 mb-2">
                        Users Management
                    </h1>
                    <p className="text-slate-600 text-lg">Manage all the users in this page.</p>
                </div>

                <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-3">User ID</th>
                        <th className="px-4 py-3">name</th>
                        <th className="px-4 py-3">Mail</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="buser-b">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.phone}</td>
                            <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="px-3 py-1 buser buser-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white"
                                    >
                                        Delete
                                    </button>
                                {/*<button
                                    onClick={()=> {
                                        setSelectedUser(user)
                                        setModalOpen(true)
                                    }}
                                    className="px-3 py-1 buser buser-gray-400 text-gray-700 rounded hover:bg-gray-100"
                                >
                                    View
                                </button>*/}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}

        {modal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-lg buser buser-white/20 max-h-[90vh] overflow-y-auto">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">user Details</h2>
                            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <table className="w-full text-sm text-left text-gray-700 buser buser-gray-300 rounded-xl mb-6">
                            <thead className="text-xs text-gray-600 uppercase bg-gray-100 buser-b">
                            <tr>
                                <th className="px-4 py-3">user ID</th>
                                <th className="px-4 py-3">name</th>
                                <th className="px-4 py-3">mail</th>
                                <th className="px-4 py-3">phone</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="px-4 py-2">{selecteduser?.id}</td>
                                <td className="px-4 py-2">{selecteduser?.name}</td>
                                <td className="px-4 py-2">{selecteduser?.email}</td>
                                <td className="px-4 py-2">{selecteduser?.phone}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end space-x-3 pt-6 buser-t buser-gray-200">
                            <button onClick={() => setModalOpen(false)} className="px-5 py-2 buser rounded-xl text-gray-600 hover:bg-gray-100">
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )}
    </section>
);
}
