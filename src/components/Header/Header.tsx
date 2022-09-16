import React from 'react'
import './Header.scss'
import {Link} from "react-router-dom";

export function Header() {


    return <div className={'header'}>
        <div className={'headerContent'}>
            <div className={'title'}><Link to={"/"}>Zifeng's Blog</Link></div>
            <div className={'login'}>Sign in</div>
        </div>
        <div className={'horizontalLine'}></div>
    </div>
}