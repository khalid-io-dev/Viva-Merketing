import {authService} from "../../services/AuthService.tsx";
import {useEffect, useState} from "react";

export default function Overview(){
    let user = authService.getCurrentUser();
    let admin = authService.isAdmin()
    const informations = user?.name?.split(" ") || [];
    const fname = informations[0] || "";
    const [loading, setLoading] = useState(false);
    const [EditUser, setEditUser] = useState(false);
    const lname = informations.slice(1).join(" ") || "";


    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col top-0 justify-center border-black h-full w-full text-black pr-10">

        <div className="pb-20  rounded-3xl justify-center h-auto ">
            <div className=" borderborder-black">
                <h1 className="text-4xl font-bold bg-gradient-to-r  from-slate-800 text-gray-50 mb-2">
                    Account informations
                </h1>
                <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl pr-6">
                    <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Number</th>
                        <th>Mail</th>
                        <th>EDIT</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{fname}</td>
                        <td>{lname}</td>
                        <td>{user?.phone}</td>
                        <td>{user?.email}</td>
                        <td>
                            <button onClick={() => setIsModalOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path
                                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            </div>

            <div>
                {loading && (
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="text-slate-600 font-medium">Loading orders...</span>
                        </div>
                    </div>
                )}
                <h1 className="text-4xl font-bold bg-gradient-to-r  from-slate-800 text-gray-50 mb-2">
                    Last order
                </h1>
                    <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">id</td>
                                <td className="px-4 py-2">date</td>
                                <td className="px-4 py-2">price</td>
                                <td className="px-4 py-2">status</td>
                            </tr>
                        </tbody>
                    </table>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-xl shadow-lg border border-white/20 max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Account</h2>
                                <button onClick={() => {
                                    setIsModalOpen(false);
                                    setEditUser(false)
                                } } className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First name</label>
                                    <input type="text" defaultValue={fname} disabled={!EditUser}
                                           className="w-full border rounded-md bg-transparent p-2 mt-1 bg-whiborder-gray-300" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                                    <input type="text" defaultValue={lname} disabled={!EditUser}
                                           className="w-full border rounded-md  bg-transparent p-2 mt-1 border-gray-300" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="tel" defaultValue={user?.phone} disabled={!EditUser}
                                           className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" defaultValue={user?.email} disabled={!EditUser}
                                           className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300" />
                                </div>

                                {/* Footer buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <div className="w-full flex justify-start">
                                        <button type="button" onClick={() => setEditUser(true)} hidden={EditUser}
                                                className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 justify-start">
                                            Edit
                                        </button>
                                    </div>

                                    <button type="button" onClick={() => {
                                        setIsModalOpen(false);
                                        setEditUser(false);
                                    }}
                                            className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
