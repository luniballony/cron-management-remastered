import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ViewAll from "../pages/ViewAll";
import Delete from "../pages/Delete";
import AddJob from "../pages/AddJob";
import View from "../pages/View";
import NotFound from "../pages/NotFound";

/*
    MISSING ROUTES:
    - list all

*/

function AppRouter () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home/>} />
                <Route path="/view/:id" element = {< View />} />
                <Route path="/view-all" element = {< ViewAll />} />
                <Route path="/delete/:cronJob" element = {< Delete />} />
                <Route path="/addjob" element = {<AddJob />} />
                <Route path="/*" element = {<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter