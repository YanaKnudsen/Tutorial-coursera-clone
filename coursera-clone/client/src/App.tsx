// initialize project: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite
// https://tailwindcss.com/docs/guides/vite
//remove everything from app.css
// yarn add tailwindcss postcss autoprefixer
// npx tailwindcss init -p
//npm i react-router-dom axios
//FontAwesome https://dev.to/davidemaye/how-to-set-up-font-awesome-in-react-5a8d
import './App.css'
import {Routes,Route} from "react-router-dom";
import axios from "axios";
import IndexPage from "./pages/IndexPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";


axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;

function App() {

    return (
        <Routes>

                <Route index element={<IndexPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile/:subpage?" element={<ProfilePage/>}/>

        </Routes>

    )
}

export default App
