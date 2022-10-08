import React, {SyntheticEvent, useEffect, useState} from 'react'
import './Header.scss'
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Login_Register_Form} from "../Login_Register_Form/Login_Register_Form";
import {debug} from "util";

export function Header() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setPanel('');
    }
    const handleShow = () => {
        setShow(true);
        setPanel('Login');
    }

    const [panel, setPanel] = useState('');
    const handleLoginPanel = () => setPanel('Login');
    const handleRegisterPanel = () => setPanel('Register');

    const [validated, setValidated] = useState(false);
    const ip_addr = 'http://127.0.0.1:4000';


    const submitHandler = async (event: SyntheticEvent, email: string, pwd: string) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {

            event.stopPropagation();
        }
        setValidated(true);

        let payload = {
            "email": email,
            "pwd": pwd
        }

        if (panel === 'Register') {


             let res = await fetch(ip_addr + "/api/register", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                redirect: 'follow'
            })
            const response = await res.json()
            console.log('out')
            console.log(response)
            alert(response.message)






        } else if (panel === 'Login') {


            let res = await fetch(ip_addr + "/api/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                redirect: 'follow'

            });
            const response = await res.json()
            console.log('out')
            console.log(response)
            alert(response.message)
        }

    };


    useEffect(() => {
        const login = document.querySelector('.panelLogin');
        const register = document.querySelector('.panelRegister');

        if (panel === 'Login' && login != null && register != null) {

            login.setAttribute("style", "border-bottom: darkgrey 4px solid");
            register.setAttribute("style", "border-bottom: 0");
        } else if (panel === 'Register' && login != null && register != null) {
            register.setAttribute("style", "border-bottom: darkgrey 4px solid");
            login.setAttribute("style", "border-bottom: 0");
        }
    }, [panel])

    return <>
        <div className={'header'}>
            <div className={'headerContent'}>
                <div className={'title'}><a href={"https://zifengallen.me/"}><img className={'an'} src={"../../an.png"}
                                                                                  alt={'安'}/></a><Link to={"/"}>Zifeng's
                    Blog</Link></div>
                <div tabIndex={0} className={'login'} onClick={handleShow}>Sign in</div>
            </div>
            <div className={'horizontalLine'}></div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Zifeng's Blog</Modal.Title>
            </Modal.Header>
            <div className={'loginForm'}>
                <div className={'panel'}>
                    <div className={'panelText panelLogin'} onClick={handleLoginPanel}>Login</div>
                    <div className={'panelText panelRegister'} onClick={handleRegisterPanel}>Register</div>
                </div>
                <Login_Register_Form validated={validated} submitHandler={submitHandler}/>
            </div>

        </Modal>
    </>
}