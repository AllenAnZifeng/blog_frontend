import React from 'react'
import './Body.scss'
import {Card} from "../Card/Card";
import Spinner from 'react-bootstrap/Spinner';
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {
    useAllArticles,
    selectAllArticles,
    selectArticleStatus,
    selectArticleError
} from '../../features/articles/allArticleSlice'




export function Body() {

    const dispatch = useAppDispatch()
    const articles = useAppSelector(selectAllArticles)
    const articlesStatus = useAppSelector(selectArticleStatus)
    const error = useAppSelector(selectArticleError)

    useAllArticles(articlesStatus,dispatch)


    let content;

    if (articlesStatus === 'loading' || articlesStatus === 'success_one_page') {
        content = <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
    } else if (articlesStatus === 'success_all') {
        content = articles.map((article, index) => (
            <Card key={index} data={article}/>
        ))
    } else if (articlesStatus === 'failed') {
        content = <div>{error}</div>
    }


    return <div className={'bodyContent'}>
        {content}
    </div>
}