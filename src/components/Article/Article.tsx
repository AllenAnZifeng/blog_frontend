import React, {useEffect, useState} from 'react'
import './Article.scss'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectAllArticles} from "../../features/articles/articleSlice";


// export function Article() {
//     const [data, setData] = useState("");
//     let filename = useParams().filename;
//
//     useEffect( () => {
//         const fetchData = async () => {
//             const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + filename
//             let result:string = await fetch(URL).then(res => res.text())
//             setData(result);
//         }
//         fetchData().catch(console.error)
//     },[filename]);
//
//     return <div className={'article'}>
//         <ReactMarkdown>{data}</ReactMarkdown>
//     </div>
// }

export function Article() {

    const articles = useAppSelector(selectAllArticles)
    let filename = useParams().filename;
    let data = articles.filter((article) => article.filename ===filename)
    console.log(data)
    return <div className={'article'}>
           <ReactMarkdown>{data[0].data}</ReactMarkdown>
    </div>
}