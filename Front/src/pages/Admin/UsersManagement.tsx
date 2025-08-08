import {useEffect, useState} from "react";
import {makeAuthenticatedRequest, API_URL} from "../../services/Requests.tsx";
import {authService} from "../../services/AuthService.tsx";


interface roles {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    password: string;
    roles: roles[];
}

export default function UsersManagement(){

    const[users, setUsers] = useState<User[]>([])
    const[adminslist, setAdminslist] = useState<User[]>([])
    const[customerslist, setcustomerslist] = useState<User[]>([])
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

            setAdminslist(data.filter((user: User) =>
                user.roles.some(role => role.name === 'admin')
            ));
            setcustomerslist(data.filter((user: User) =>
                user.roles.some(role => role.name === 'customer')
            ));

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

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                        Users Management
                    </h1>
                    <p className="text-slate-600 text-lg">Manage the users of your web site.</p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>




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

                {/* admins */}
                <div>
                    <h1 className="text-red-700 text-3xl font-mono pb-6 font-bold"><span className="p-2">Administrators</span></h1>
                    <div className="mx-auto max-w-14xl">
                        <table className=" bg-white/70 w-full p-8 mb-8 rounded-3xl ">
                            <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">User ID</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">First name</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Last name</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Mail</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Phone</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {adminslist.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-150 ">
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.id}</td>
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.name}</td>
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.name}</td>
                                    <td className="py-4 px-6 text-slate-600">{user.email}</td>
                                    <td className="py-4 px-6 text-slate-600">{user.phone}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 text-sm font-medium"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                            {/* <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setModalOpen(true);
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-150 text-sm font-medium"
                                            >
                                                View
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </div>

                {/* Customers */}
                <div className="mx-auto max-w-14xl">

                    <h1 className="text-indigo-700 text-3xl font-mono pb-6 font-bold"><span className=" p-2">Customers</span></h1>
                    <table className=" bg-white/70 w-full p-8 mb-8 rounded-3xl ">
                             <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">User ID</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">First name</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Last name</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Mail</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Phone</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {customerslist.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-150 ">
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.id}</td>
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.name}</td>
                                    <td className="py-4 px-6 font-semibold text-slate-800">{user.name}</td>
                                    <td className="py-4 px-6 text-slate-600">{user.email}</td>
                                    <td className="py-4 px-6 text-slate-600">{user.phone}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 text-sm font-medium"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                            {<button
                                                onClick={() => {
                                                  setSelectedUser(user);
                                                  setModalOpen(true);
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-150 text-sm font-medium"
                                              >
                                                Edit
                                              </button> }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                </div>

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
