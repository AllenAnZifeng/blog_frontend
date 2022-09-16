import React, {useEffect, useState} from 'react'
import './Card.scss'
import { Link } from "react-router-dom";

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
            let splitted:string[] = result.split("\n",6)
            let title:string = splitted[0].slice(2).trim()
            let time:string = splitted[2].split(":")[1].slice(0,-1).trim()
            let description:string = splitted[3].split(":")[1].slice(0,-1).trim()
            let category:string = splitted[4].split(":")[1].slice(0,-1).trim()
            let tags:string[] = splitted[5].split(":")[1].split(',')
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

    return <div className={'card'}>
        <Link to={"/blog/"+props.filename}>{info.title}</Link>
        <div className={'abstract'}><pre>{JSON.stringify(info)}</pre></div>
    </div>
}