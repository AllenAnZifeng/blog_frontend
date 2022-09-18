import React, { useState, useEffect } from 'react'
import './Body.scss'
import {Card} from "../Card/Card";

type Props = {
    handler:  React.Dispatch<React.SetStateAction<{filename: string,title: string, time: string, description: string, category: string, tags: string[], data: string}[]>>,

}

export function Body(props:Props) {

    const [cards, setCards] = useState<React.ReactElement[]>([]);
    const [blogsInfo, setblogsInfo] = useState(Array<{filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string}>);

    useEffect( () => {


        const fetchData = async () => {
            let result:string = await fetch('https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/fileInfo.txt').then(res => res.text())
            let temp: JSX.Element[] = [];
            let filenames: string[] = result.trim().split('\n')
            setblogsInfo(Array<{filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string}>(filenames.length))
            for (let i = 0; i < filenames.length; i++) {
                temp.push(<Card key={i} index={i} blogsInfo={blogsInfo} handler={setblogsInfo} filename={filenames[i]}/>)
            }
            setCards(temp)
            props.handler(blogsInfo)


        }
        fetchData().catch(console.error)
    },[]);

    return <div className={'bodyContent'}>
        {cards}
    </div>
}