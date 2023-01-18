import React from 'react'
import style from './Footer.module.scss'

export function Footer() {

    return <div className={style.footer}>
        <div className={style.footerContent}>
            Made with TypeScript, React and ❤
        </div>
    </div>
}