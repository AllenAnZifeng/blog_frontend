import React, {useEffect, useState} from 'react'
import './Card.scss'
import { createBrowserRouter,RouterProvider,Link } from "react-router-dom";
import {Article} from "../Article/Article";
type Props = {
    filename: string
}

export function Card(props: Props) {

    const [data, setData] = useState("");
    const [info, setInfo] = useState({
        title: "",
        time: "",
        description: "",
        category: "",
        tags: [""]
    });




    useEffect( () => {
        const fetchData = async () => {
            const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + props.filename
            let result:string = await fetch(URL).then(res => res.text())
            let splitted:string[] = result.split("\n",5)
            let title:string = splitted[0].slice(2)
            let time:string = splitted[1].split(":")[1].trim()
            let description:string = splitted[2].split(":")[1].trim()
            let category:string = splitted[3].split(":")[1].trim()
            let tags:string[] = splitted[4].split(":")[1].split(',')
            setInfo({
                title:title,
                time: time,
                description: description,
                category: category,
                tags: tags
            })
            setData(result)
        }
        fetchData().catch(console.error)
    },[props,data]);

    return <div>
        <Link to={"/blog/"+props.filename}>{info.title}</Link>
        <div><pre>{JSON.stringify(info)}</pre></div>
    </div>
}