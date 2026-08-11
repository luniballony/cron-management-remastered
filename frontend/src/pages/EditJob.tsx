import { useParams } from "react-router"
import { useEffect, useState } from "react";
import useJobs from "../hooks/useJobs";

function EditJob () {

    const { id } = useParams<{id : string}>();
    const {job, fetchUniqueJob } = useJobs();

    const [uri, setUri] = useState("");
    const [body, setBody] = useState<string | "">("");
    const [schedule, setSchedule]  = useState("");
    const [http_method, setMethod]  = useState("");
    const [timezone, setTimezone] = useState<string>("GMT+1");

    const methods = ['GET', 'PUT', 'DELETE', 'PATCH'];

    useEffect (() => {
        if (id) {
            fetchUniqueJob(Number(id));
        };
    }, [id])

    useEffect(() => {
        if(job !== null){
            setUri(job.uri);
            setSchedule(job.schedule);
            setMethod(job.http_method);
            setTimezone(job.timezone);
        }
    }, [job])
    
    function handleSubmit (e : React.FormEvent) {
        e.preventDefault();
        
        fetch(`http://localhost:3000/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({uri, body, schedule, http_method, timezone})
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(`Job edited`);
                } else {
                    console.log("Something went wrong.");
                }
            })
    }
    
    return (
        <div>
            <div>{`Job ${id}`}</div>
            <form onSubmit={handleSubmit}>
                <input
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    placeholder="Uri"
                />

                <select
                    value={http_method}
                    onChange={(e) => setMethod(e.target.value)}>
                        {methods.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                </select>

                <input 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                />
                <input 
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="Schedule"
                />
                <input 
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="Timezone"
                />
                <button type="submit"
                        className="cursor-pointer
                                    bg-blue-300
                                    m-4 p-2 rounded-xl
                        ">Edit Job</button>
            </form>
        </div>
    )
}

export default EditJob