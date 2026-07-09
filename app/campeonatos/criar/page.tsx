'use client'
import AddTime from "../../components/addtimes"
import AddTorneio from "../../components/addtorneio"
import { useState } from "react"



export default function Home (){

    const [torneioId, setTorneioId] = useState<string | null>(null)

    return (
        <div>{!torneioId ? <AddTorneio onCreated={(id: string) => setTorneioId(id)}/>:<AddTime id={torneioId}/>}
            <p>${torneioId}</p>
        </div>
    )
}