import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Delete () {

    const {cronJob} = useParams<{cronJob : string}>();

    // variable to send result to user
    // true -> success
    // false -> not successful
    const [state, setState] = useState<boolean | null>(null)
    
    useEffect(() => {
        fetch(`http://localhost:3000/delete/${cronJob}`, { method: "DELETE" })
            .then(res => {
                if (res.status === 200) {
                    setState(true)
                } else {
                    setState(false)
                }
            }) 
    }, [cronJob])

    if(!cronJob) {
        console.log(`Oh no, there was an error getting the page id: ${cronJob}`);
        return null;
    }
    
    return( 
    <>
        {state === null && "Loading..."}
        {state === true && "Deletion successful"}
        {state === false && "Couldn't delete the cron job: it either has already been deleted or there was an error"}
    </>
)
}

export default Delete;