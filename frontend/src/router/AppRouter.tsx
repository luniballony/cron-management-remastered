import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ViewAll from "../pages/ViewAll";
import Delete from "../pages/Delete";
import AddJob from "../pages/AddJob";

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
                <Route path="/delete/:cronJob" element = {< Delete />} />
                <Route path="/addjob" element = {<AddJob />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter