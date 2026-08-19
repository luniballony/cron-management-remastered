function About () {
    return(
        <div className="
            bg-grey
            text-accent-blue text-[1.4rem] text-center font-notable
            p-[4rem]
        ">
            <p className='
                m-6 mb-2 p-2
                text-bright-yellow text-center text-[6rem]
                [-webkit-text-stroke:3px_blue]
                font-notable font-bold
            '>ABOUT</p>
            <p>This website was created by Matilde Carmo - 
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/luniballony' className="
                    text-black
                "> Luniballony</a>
            </p> 

            <p>This website allows creating, list, edit and delete Cron Jobs with real time monitorization.</p>

            <div className='
                p-[2rem]
            '>
                <p className='
                    m-6 mb-0
                    text-dark-blue text-center text-[2rem]
                    font-notable font-bold
                '>Contacts</p>                
                <p>email: </p>
                <p>misabelpcarmo@gmail.com</p>
                
            </div>
        </div>
    )
}

export default About