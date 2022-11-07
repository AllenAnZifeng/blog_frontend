import React from 'react'
import './HomePage.scss'
import {Header} from "../Header/Header";
import {Body} from "../Body/Body";
import {Footer} from "../Footer/Footer";

type Props = {
    handler:  React.Dispatch<React.SetStateAction<{filename: string,title: string, time: string, description: string, category: string, tags: string[], data: string}[]>>
}

export function HomePage(props:Props) {

    return <>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
    </>
}