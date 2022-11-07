import React, {useEffect, useState} from 'react'
import './Card.scss'
import { Link } from "react-router-dom";
import {article} from "../../features/articles/articleSlice";

type Props = {
    filename: string,
    index: number,
    blogsInfo: article
    handler: React.Dispatch<React.SetStateAction<{filename: string, title: string, time: string, description: string, category: string, tags: string[], data: string}[]>>
}

export function Card(props: Props) {



    return <Link to={"/blog/"+props.filename} className={'cards'}>
                <div className={'cards-title'}>{props.blogsInfo.title}</div>
                <div className={'cards-description'}>{props.blogsInfo.description}</div>
                <div className={'cards-footer'}>
                    <div className={'cards-time'}>{props.blogsInfo.time}</div>
                    <div className={'cards-category'}>{props.blogsInfo.category}</div>
                </div>
            </Link>
}