import React, {useEffect, useState} from 'react'
import './Article.scss'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";


export function Article() {
    const [data, setData] = useState("");
    let filename = useParams().filename;

    useEffect( () => {
        const fetchData = async () => {
            const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + filename
            let result:string = await fetch(URL).then(res => res.text())
            setData(result);
        }
        fetchData().catch(console.error)
    },[filename]);

    return <div className={'article'}>
        <ReactMarkdown>{data}</ReactMarkdown>
    </div>
}