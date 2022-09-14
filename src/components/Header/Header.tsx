import React from 'react'
import './Header.scss'

export function Header() {

    return <div className={'header'}>
        <div className={'headerContent'}>
            <div className={'title'}>Zifeng's Blog</div>
            <div className={'login'}>Sign in</div>
        </div>
        <div className={'horizontalLine'}></div>
    </div>
}