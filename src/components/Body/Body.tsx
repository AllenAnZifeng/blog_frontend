import React, {useEffect} from 'react'
import './Body.scss'
import {Card} from "../Card/Card";
import Spinner from 'react-bootstrap/Spinner';
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {fetchArticles, selectAllArticles} from '../../features/articles/articleSlice'



export function Body() {

    const dispatch = useAppDispatch()
    const articles = useAppSelector(selectAllArticles)
    const articlesStatus = useAppSelector((state) => state.articles.status)
    const error = useAppSelector((state) => state.articles.error)



    useEffect(() => {
        if (articlesStatus === 'idle') {
                dispatch(fetchArticles())
            }
        }
        , [articlesStatus,dispatch])

    // console.log(articles)

    let content;

    if (articlesStatus === 'loading') {
        content = <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    } else if (articlesStatus === 'success') {
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