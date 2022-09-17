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
            let result:string = await fetch('https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/fileInfo.txt').then(res => res.text())
            let temp: JSX.Element[] = [];
            let filenames: string[] = result.trim().split('\n')
            for (let i = 0; i < filenames.length; i++) {
                temp.push(<Card key={i} filename={filenames[i]}/>)
            }
            setCards(temp)
            props.handler(filenames)
        }
        fetchData().catch(console.error)
    },[]);

    return <div className={'bodyContent'}>
        {cards}
    </div>
}