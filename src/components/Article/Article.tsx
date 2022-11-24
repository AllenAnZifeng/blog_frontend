import React, {useEffect, useState} from 'react'
import './Article.scss'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import {useAppSelector} from '../../app/hooks'
import {article, selectAllArticles} from '../../features/articles/articleSlice'


export function Article() {
    const [data, setdata] = useState<string>("");
    let filename = useParams().filename;
    const articles = useAppSelector(selectAllArticles)


    useEffect( () => {
        let file:article|undefined = articles.find((article) => article.filename === filename)
        if ( typeof file === 'undefined') {
            setdata("Error")
        }else {
            setdata(file.data)
        }
    },[articles,filename]);

    return <div className={'article'}>
        <ReactMarkdown>{data}</ReactMarkdown>
    </div>
}


