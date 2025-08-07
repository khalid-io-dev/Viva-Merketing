import { authService } from "../../services/AuthService.tsx";
import { useState } from "react";
import { API_URL, makeAuthenticatedRequest } from "../../services/Requests.tsx";

export default function Overview() {
    let user = authService.getCurrentUser();
    let admin = authService.isAdmin();
    const informations = user?.name?.split(" ") || [];

    const [updated, setUpdated] = useState(false);
    const [phone, setPhone] = useState<string>(user?.phone || "");
    const [email, setEmail] = useState<string>(user?.email || "");
    const [fname, setFname] = useState<string>(informations[0] || "");
    const [lname, setLname] = useState<string>(informations.slice(1).join(" ") || "");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [draftphone, setdraftPhone] = useState<string>(phone);
    const [draftemail, setdraftEmail] = useState<string>(email);
    const [draftfname, setdraftFname] = useState<string>(fname);
    const [draftlname, setdraftLname] = useState<string>(lname);

    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validateInputs = (
        fname: string,
        lname: string,
        phone: string,
        email: string
    ): Record<string, string> => {
        const errors: Record<string, string> = {};
        const hasDigit = /\d/;

        if (!fname || fname.includes(" ") || hasDigit.test(fname) || fname.length < 3) {
            errors.fname = "First name invalid (min 3 chars, no spaces or digits).";
        }
        if (!lname || lname.includes(" ") || hasDigit.test(lname) || lname.length < 3) {
            errors.lname = "Last name invalid (min 3 chars, no spaces or digits).";
        }
        if (!phone || phone.includes(" ")) {
            errors.phone = "Phone invalid (no spaces).";
        }
        if (!email || email.includes(" ") || !email.includes("@")) {
            errors.email = "Email invalid (must contain @ and no spaces).";
        }

        return errors;
    };

    const handleChange = (newData: string, type: string) => {
        switch (type) {
            case "phone":
                setdraftPhone(newData);
                break;
            case "email":
                setdraftEmail(newData);
                break;
            case "fname":
                setdraftFname(newData);
                break;
            case "lname":
                setdraftLname(newData);
                break;
        }

        const newErrors = validateInputs(
            type === "fname" ? newData : draftfname,
            type === "lname" ? newData : draftlname,
            type === "phone" ? newData : draftphone,
            type === "email" ? newData : draftemail
        );
        setErrors(newErrors);
    };

    // Enregistrement des données avec validation complète
    const handleSave = async () => {
        const validationErrors = validateInputs(draftfname, draftlname, draftphone, draftemail);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // On arrête si erreurs
        }

        try {
            setLoading(true);

            const data = {
                id: user?.id,
                name: draftfname + " " + draftlname,
                phone: draftphone,
                email: draftemail,
            };

            const result = await makeAuthenticatedRequest(`${API_URL}/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            await authService.refreshUserData();

            setFname(draftfname);
            setLname(draftlname);
            setEmail(draftemail);
            setPhone(draftphone);

            setUpdated(true);
            setErrors({}); // Clear errors on success
            console.log("Result of the request:", result);
        } catch (error: any) {
            console.error("Failed to update user:", error);
            try {
                const errorData = JSON.parse(error.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: error.message || "Failed to update user" });
            }
        } finally {
            setLoading(false);
            setTimeout(() => setUpdated(false), 3000);
        }
    };

    return (
        <div className="flex flex-col top-0 justify-center border-black h-full w-full text-black pr-10">
            {updated && !loading && (
                <div className="pb-6 w-auto rounded-3xl justify-center h-auto ">
                    <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200/50 text-emerald-700 rounded-xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-3 text-emerald-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-center">Account updated.</p>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 text-gray-50 mb-2">
                Account informations
            </h1>

            {loading ? (
                <div className="text-center">
                    <div className="inline-flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-slate-600 font-medium">Loading informations...</span>
                    </div>
                </div>
            ) : (
                <div className="pb-10">
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
                            <td>{phone}</td>
                            <td>{email}</td>
                            <td>
                                <button onClick={() => setIsModalOpen(true)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-pencil"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {!admin && (
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 text-gray-50 mb-2">
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
                    {errors.order && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 rounded-xl shadow-lg backdrop-blur-sm">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {Array.isArray(errors.order) ? errors.order[0] : errors.order}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-xl shadow-lg border border-white/20 max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Account</h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setErrors({});
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First name</label>
                                    <input
                                        type="text"
                                        value={draftfname}
                                        onChange={(e) => handleChange(e.target.value, "fname")}
                                        className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300"
                                    />
                                    {errors.fname && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.fname}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                                    <input
                                        type="text"
                                        value={draftlname}
                                        onChange={(e) => handleChange(e.target.value, "lname")}
                                        className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300"
                                    />
                                    {errors.lname && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.lname}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        value={draftphone}
                                        onChange={(e) => handleChange(e.target.value, "phone")}
                                        className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300"
                                    />
                                    {errors.phone && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.phone}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={draftemail}
                                        onChange={(e) => handleChange(e.target.value, "email")}
                                        className="w-full border rounded-md bg-transparent p-2 mt-1 border-gray-300"
                                    />
                                    {errors.email && (
                                        <div className="mt-1 text-red-600 text-sm">{errors.email}</div>
                                    )}
                                </div>

                                {/* Footer buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setErrors({});
                                        }}
                                        className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (Object.keys(errors).length === 0) {
                                                handleSave();
                                                setIsModalOpen(false);
                                            }
                                        }}
                                        className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
