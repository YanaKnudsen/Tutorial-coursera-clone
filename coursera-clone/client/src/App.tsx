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
import Layout from "./layouts/Layout.tsx";


axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<IndexPage/>}/>
            </Route>

        </Routes>

    )
}

export default App
