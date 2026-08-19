const NavBar = () => {
    return (
        <div className="
            bg-light-blue
            border-b
            p-3
            flex justify-around
            text-black font-notable text-[1.2rem]
        ">
            <li className="list-none">
                <a href="/">HOME</a></li>
            <li className="list-none">
                <a href="/view-all">VIEW JOBS</a></li>
            <li className="list-none">
                <a href="/addjob">CREATE NEW JOB</a></li> 
            <li className="list-none">
                <a href="/about">ABOUT</a></li>
        </div>
    )
}

export default NavBar
                                           