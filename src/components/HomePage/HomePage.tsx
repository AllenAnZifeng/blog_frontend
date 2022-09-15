import React from 'react'
import './HomePage.scss'
import {Header} from "../Header/Header";
import {Body} from "../Body/Body";
import {Footer} from "../Footer/Footer";

type Props = {
    handler: React.Dispatch<React.SetStateAction<string[]>>
}

export function HomePage(props:Props) {

    return <>
        <Header></Header>
        <Body handler={props.handler}></Body>
        <Footer></Footer>
    </>
}