import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
        })
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500">
                    <span className="animate-spin text-2xl font-bold text-emerald-600">Loading...</span>
                </div>
            )}
            <div className={loading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-500'}>
                {children}
            </div>
        </>
    );
}