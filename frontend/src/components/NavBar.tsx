const NavBar = () => {
    return (
        <div className="
            bg-blue-50
            border-b
            p-3
            flex justify-around
        ">
            <li className="list-none">
                <a href="/">Home</a></li>
            <li className="list-none">
                <a href="/view-all">View Jobs</a></li>
            <li className="list-none">
                <a href="/addjob">Create New Job</a></li>            
            <li className="list-none">
                <a href="/">Edit Job</a></li>
            <li className="list-none">
                <a href="/about">About</a></li>
        </div>
    )
}

export default NavBar
                                           