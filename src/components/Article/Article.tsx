import React from 'react'
import './Article.scss'
import ReactMarkdown from 'react-markdown'

type Props = {
    data: string

}
export function Article(props:Props) {



    return <div className={'article'}>
        <ReactMarkdown>{props.data}</ReactMarkdown>
    </div>
}