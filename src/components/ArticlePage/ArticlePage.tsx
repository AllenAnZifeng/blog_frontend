import React, {useEffect, useState} from 'react'
import './ArticlePage.scss'
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Article} from "../Article/Article";
import {useParams} from "react-router-dom";



type Props = {
    data:  Array<{filename: string,title: string, time: string, description: string, category: string, tags: string[], data: string}>

}

export function ArticlePage(props:Props) {

    const [blogNumber, setblogNumber] = useState(0)
    let filename = useParams().filename;

    useEffect( () => {



        if (typeof filename == "string"){
            let number:number = parseInt(filename.slice(4).split(".")[0])-1
            setblogNumber(number)
        }
        else {
            console.error("Error!")
        }
    },[blogNumber]);



    return <>
        <Header></Header>
        <Article data={props.data[blogNumber].data}></Article>
        <Footer></Footer>
    </>
}
