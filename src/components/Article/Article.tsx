import React from 'react'
import style from './Article.module.scss'
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {
    article,
    selectAllArticles,
    selectArticleError,
    selectArticleStatus,
    useOneArticle
} from '../../features/articles/allArticleSlice'
import Spinner from "react-bootstrap/Spinner";
import {Comment} from "../Comment/Comment";



export function Article() {

    let filename = useParams().filename||"";

    const dispatch = useAppDispatch()
    const articles = useAppSelector(selectAllArticles)
    const articlesStatus = useAppSelector(selectArticleStatus)
    const error = useAppSelector(selectArticleError)

    useOneArticle(filename,articles,dispatch)

    let content;

    if (articlesStatus === 'loading') {
        content = <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    } else if (articlesStatus === 'success_one_page' || articlesStatus === 'success_all') {
        let file:article|undefined = articles.find((article) => article.filename === filename)
        if ( typeof file === 'undefined') {
            content = <div>Blog Not Found</div>
        }else {
            content = <>
                        <ReactMarkdown>{file.data}</ReactMarkdown>
                        <Comment blogID={filename}></Comment>
                      </>
        }
    } else if (articlesStatus === 'failed') {
        content = <div>{error}</div>
    }

    return <div className={style.article}>
       {content}
    </div>
}


