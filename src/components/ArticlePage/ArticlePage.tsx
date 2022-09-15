import React from 'react'
import './ArticlePage.scss'
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Article} from "../Article/Article";

export function ArticlePage() {

    return <>
        <Header></Header>
        <Article data={"123"}></Article>
        <Footer></Footer>
    </>
}
