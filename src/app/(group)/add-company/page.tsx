"use client"
import { FormEvent, useState } from "react";

export default function Page() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const company = {
            title: title, description: description
        }
        const res = await fetch("http://localhost:3000/api/company", {
            method: "POST",
            body: JSON.stringify(company)
        })
        console.log(res);
        
        const data = await res.json();
        console.log(data);
        
        if (data.success) {
            alert("ok done company")

        } else (
            alert(data.message)
        )

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter Company Name" onChange={(e) => { setTitle(e.target.value) }} />
                <input placeholder="Enter Company Description" onChange={(e) => { setDescription(e.target.value) }} />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}