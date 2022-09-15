import React, { useState, useEffect } from 'react'
import './Body.scss'
import {Card} from "../Card/Card";

type Props = {
    handler: React.Dispatch<React.SetStateAction<string[]>>
}

export function Body(props:Props) {

    const [cards, setCards] = useState<React.ReactElement[]>([]);

    useEffect( () => {

        const fetchData = async () => {
            let result = await fetch('https://api.github.com/repos/AllenAnZifeng/blog_content/contents/contents').then(res => res.json())
            let temp = [];
            let data_backto_app=[]
            for (let i = 0; i < result.length; i++) {
                temp.push(<Card key={i} filename={result[i].name}/>)
                data_backto_app.push(result[i].name)
            }
            setCards(temp)
            props.handler(data_backto_app)
        }
        fetchData().catch(console.error)
    },[]);

    return <div className={'bodyContent'}>
        {cards}
    </div>
}