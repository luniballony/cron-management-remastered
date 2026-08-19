function Home () {
    return (
        <div className="bg-accent-blue
            flex flex-col h100
            py-[8rem]
        ">  
            <div className ="flex flex-col
                    items-center mx-auto
                ">
                <div className="
                    text-grey text-[1.8rem]
                    font-playfair
                    
                ">welcome</div>

                <div className="
                    m-6 mb-2 p-2
                    text-grey text-center text-[4rem]
                    font-notable font-bold
                ">CRON JOB MANAGER</div>

                <button className="
                    cursor-pointer
                    bg-dark-blue
                    py-[1rem] px-[2rem]
                    text-grey text-[1.4rem]
                    font-playfair
                ">Get Started</button>
            </div>
        </div>
    )
}

export default Home;