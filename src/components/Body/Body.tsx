import React, { useState, useEffect } from 'react'
import './Body.scss'
import {Card} from "../Card/Card";



export function Body() {

    const [cards, setCards] = useState<React.ReactElement[]>([]);

    useEffect( () => {

        const fetchData = async () => {
            let result = await fetch('https://api.github.com/repos/AllenAnZifeng/blog_content/contents/contents').then(res => res.json())
            let temp = [];
            for (let i = 0; i < result.length; i++) {
                temp.push(<Card key={i} filename={result[i].name}/>)
            }
            setCards(temp)
        }
        fetchData().catch(console.error)
    },[]);

    return <div className={'bodyContent'}>
        {cards}
    </div>
}