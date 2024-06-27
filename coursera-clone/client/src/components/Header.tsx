import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass,faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {

    return (
        <header className="w-full justify-between flex px-7 items-center sticky">
            <div className="flex lg:hidden">
                <button><FontAwesomeIcon className="w-4 h-4" icon={faBars} /></button>
            </div>
            <div className="flex items-center gap-3">
               <Link to={"/"} className="text-blue-800 text-3xl">Courses</Link>
                <div className="hidden lg:flex items-center gap-3">
               <button className="flex border border-blue-800 text-blue-800 py-2 px-3 rounded-md items-center">
                   Explore
                   <FontAwesomeIcon className="w-3 h-3 ml-2" icon={faChevronDown} />
               </button>
               <button className="flex border border-gray-400 text-gray-400 p-2 rounded-full items-center ">What do you want to learn?
                   <FontAwesomeIcon className="w-3 h-3 ml-10 border border-blue-800 rounded-full bg-blue-800 p-2 text-white" icon={faMagnifyingGlass} />
               </button>
                </div>
            </div>
            <div className="hidden lg:flex flex-col lg:flex-row items-center gap-4 ">
                <div  className="text-gray-500 hover:text-blue-500 duration-500 cursor-pointer">Degrees</div>
                <div  className="text-gray-500 hover:text-blue-500 duration-500 cursor-pointer">Find Careers</div>
                <Link to={"/"} className="text-blue-500 hover:underline duration-500">Log In</Link>
                <button className="border border-blue-800 text-blue-800 p-2 rounded-md hover:bg-blue-100 duration-500">Join for free</button>
            </div>
            <div className="flex lg:hidden">
                <button><FontAwesomeIcon className="w-4 h-4" icon={faMagnifyingGlass} /></button>
            </div>
        </header>

    )
}

export default Header