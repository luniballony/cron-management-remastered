import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ViewAll from "../pages/ViewAll";

/*
    MISSING ROUTES:
    - list all

*/

function AppRouter () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home/>} />
                <Route path="/view/:id" element = {< Home />} />
                <Route path="/view-all/" element = {< ViewAll />} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter