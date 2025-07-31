import {authService} from '../services/AuthService.tsx'
import {useNavigate} from "react-router-dom";
import {type JSX, useEffect, useState} from "react";


type GuardRoutesJSX = {
    children: JSX.Element;
    requireConnection: boolean;
};

export default function GuardRoutes({ children, requireConnection }: GuardRoutesJSX){
    const navigate = useNavigate();
    const [Allowed, setAllowed] = useState(false);

//Login, registration => connecté
    useEffect(() => {
        const connected = authService.isAuthenticated();

        if (connected && !requireConnection) {
            alert("Permission denied: Already connected");
            navigate('/');
            setAllowed(false)
        } else if (!connected && requireConnection) {
            alert("Permission denied: User not connected");
            navigate('/');
            setAllowed(false);
        } else {
            setAllowed(true);
        }
    }, [children, navigate, requireConnection]);
    if (Allowed){
        return children
    }

}