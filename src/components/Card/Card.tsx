import React, {useEffect, useState} from 'react'
import './Card.scss'
import { Link } from "react-router-dom";

type Props = {
    filename: string,
    index: number,
    blogsInfo: {filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string}[],
    handler: React.Dispatch<React.SetStateAction<{filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string}[]>>
}

export function Card(props: Props) {

    const [info, setInfo] = useState({
        filename: "",
        title: "",
        time: "",
        description: "",
        category: "",
        tags: [""],
        data: ""
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
            let info = {
                filename:props.filename,
                title:title,
                time: time,
                description: description,
                category: category,
                tags: tags,
                data: result
            }
            setInfo(info)
            let newBlogsInfo = props.blogsInfo
            newBlogsInfo[props.index] = info
            props.handler(newBlogsInfo)

        }
        fetchData().catch(console.error)
    },[props]);



    return <Link to={"/blog/"+props.filename} className={'card'}>
                <div className={'card-title'}>{info.title}</div>
                <div className={'card-description'}>{info.description}</div>
                <div className={'card-footer'}>
                    <div className={'card-time'}>{info.time}</div>
                    <div className={'card-category'}>{info.category}</div>
                </div>
            </Link>



}