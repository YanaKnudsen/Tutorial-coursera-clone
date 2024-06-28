import ThinLine from "../components/ThinLine.tsx";
import {useParams,Link} from "react-router-dom";
import store from "../mobx/AppDataStore.ts";

function ProfilePage() {
    let subpage=useParams();
    if(subpage.subpage===undefined){
        subpage.subpage='home';
    }
   // console.log(subpage);

    function LinkClasses(type){
        //why is not working if I add to classes?
        let classes=''
        if(type===subpage.subpage ){
            classes = classes + 'hover:text-blue-800 duration-100 text-blue-800 px-3'
        }
        else{
            classes = classes + 'hover:text-blue-500 duration-100 px-3'
        }
        return classes;
    }
    function Underline(type){
        //why is not working if I add to classes?
        let classes=''
        if(type===subpage.subpage ){
            classes = classes + 'flex h-2 w-full bg-blue-800'
        }
        else{
            classes = classes + 'hidden'
        }
        return classes;
    }

    return (
        <div className="">
            <div className="flex px-14 py-5 gap-10">
                <div className="flex flex-col gap-2 ">
                <Link className={LinkClasses('home')} to={"/profile/"}>Home</Link>
                <div className={Underline('home')}/>
                </div>
                <div className="flex flex-col gap-2">
                <Link className={LinkClasses('learning')} to={"/profile/learning"}>My Learning</Link>
                <div className={Underline('learning')}/>
                </div>
                <div className="flex flex-col gap-2">
                <Link className={LinkClasses('mycourses')} to={"/profile/mycourses"}>My Courses</Link>
                 <div className={Underline('mycourses')}/>
                </div>
            </div>
            <ThinLine/>
            {subpage.subpage==='home'&&(
                <div className="px-14 ">Welcome {store.user?.name}</div>
            )}
            {subpage.subpage==='mycourses'&&(
                <div className="px-14 ">mycourses</div>
            )}
        </div>

    )
}

export default ProfilePage