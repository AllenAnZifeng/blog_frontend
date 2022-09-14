import React, {useEffect, useState} from 'react'
import './Card.scss'
import ReactMarkdown from 'react-markdown'
type Props = {
    name: string
}

export function Card(props: Props) {

    const [data, setData] = useState("");

    useEffect( () => {
        const fetchData = async () => {
            const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + props.name
            console.log(URL)
            let result = await fetch(URL).then(res => res.text())
            setData(result)
        }
        console.log(data)
        fetchData().catch(console.error)
    },[props,data]);

    return <div >
        {props.name}
        <ReactMarkdown>{data}</ReactMarkdown>
    </div>
}