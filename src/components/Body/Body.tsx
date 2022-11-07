import React, {useState, useEffect} from 'react'
import './Body.scss'
import {Card} from "../Card/Card";
import Spinner from 'react-bootstrap/Spinner';
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {fetchArticles, selectAllArticles} from '../../features/articles/articleSlice'

type Props = {
    handler: React.Dispatch<React.SetStateAction<{ filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string }[]>>,

}

export function Body(props: Props) {

    const [cards, setCards] = useState<React.ReactElement[]>([]);
    const [blogsInfo, setblogsInfo] = useState(Array<{ filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string }>);
    const dispatch = useAppDispatch()
    const articles = useAppSelector(selectAllArticles)
    const articlesStatus = useAppSelector((state) => state.articles.status)
    const error = useAppSelector((state) => state.articles.error)



    useEffect(() => {
            if (articlesStatus === 'idle') {
                dispatch(fetchArticles())
            }
        }
        , [articlesStatus])

    console.log(articles)

    let content;

    if (articlesStatus === 'loading') {
        // content = <Spinner text="Loading..." />
        content = <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    } else if (articlesStatus === 'success') {
        // Sort posts in reverse chronological order by datetime string


        content = articles.map((article, index) => (
            <Card key={index} index={index} blogsInfo={article} handler={setblogsInfo} filename={article.filename}/>
        ))
    } else if (articlesStatus === 'failed') {
        content = <div>{error}</div>
    }


    return <div className={'bodyContent'}>
        {content}
        <div></div>
    </div>
}