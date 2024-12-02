import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";


const HomeButton = () => {
    const navigate = useNavigate();


    return(
        <div className="w-full fixed bottom-2 left-0 flex justify-center p-5">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex flex-row items-center bg-secondary px-10 py-3 rounded transition-all duration-300 hover:bg-primary-hover"
                    >
                        <IoHome size={24} className="text-text-light" />
                        <span className="text-text-light font-bold ml-2">
                            Home
                        </span>
                    </button>
                </div>
    )
}

export default HomeButton;  