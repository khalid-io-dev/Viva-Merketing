import {useEffect, useState} from "react";

export default function ScrollToTop() {
    const svgTop = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/>
    </svg>;
     const handleClick = () => {
            window.scrollTo(0,0);
            console.log('changement')
        }

        const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <div id="svgTop">
            <button className={scroll ? "fixed opacity-60 bg-black  z-1O right-2 bottom-4 rounded-none items-center" : "hidden"} onClick={handleClick}>
                {svgTop}
            </button>
        </div>
    )
}