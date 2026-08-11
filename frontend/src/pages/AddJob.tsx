import { useState } from "react";


function AddJob () {
    const [uri, setUri] = useState("");
    const [body, setBody] = useState<string | "">("");
    const [schedule, setSchedule]  = useState("");
    const [method, setMethod]  = useState("");
    const [timezone, setTimezone] = useState<string>("GMT+1");

    const methods = ['GET', 'PUT', 'DELETE', 'PATCH'];

    function handleSubmit (e : React.FormEvent) {
        e.preventDefault();
        
        fetch("http://localhost:3000/addjob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({uri, body, schedule, method, timezone})
        })
            .then(res => {
                if (res.status === 201) {
                    alert(`Job created`);
                } else {
                    alert("Something went wrong.");
                }
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    placeholder="Uri"
                />
                <select
                    value={method}
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
                <button type="submit">Create New Job</button>
            </form>            
        </div>
    )
}


export default AddJob