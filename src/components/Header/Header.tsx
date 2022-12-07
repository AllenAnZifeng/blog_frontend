import React, {SyntheticEvent, useEffect, useState} from 'react'
import './Header.scss'
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {LoginRegisterForm} from "../LoginRegisterForm/LoginRegisterForm";
import {useAppDispatch,useAppSelector} from "../../app/hooks";
import {fetchUser, signOut,loadFromCookie, registerUser, selectUserName, selectUserStatus} from "../../features/user/userSlice";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export type userPayload = {
    name: string, email: string, pwd: string
}


export function Header() {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false);
    const [panel, setPanel] = useState('');
    const [validated, setValidated] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPanel('');
    }
    const handleShow = () => {
        setShow(true);
        setPanel('Login');
    }

    const handleLoginPanel = () => {
        setPanel('Login');
    }
    const handleRegisterPanel = () => setPanel('Register');

    let status = useAppSelector(selectUserStatus)
    let name = useAppSelector(selectUserName)


    let loginButton;

    if (status === 'Guest') {
        loginButton = <div tabIndex={0} className={'login'} onClick={handleShow}>Sign in</div>
    }else{
        loginButton =   <OverlayTrigger
            key={'bottom'}
            placement={'bottom'}
            overlay={
                <Tooltip id={`tooltip-bottom`}>
                    Click to Sign Out
                </Tooltip>
            }
        >
            <div tabIndex={0} className={'login'} onClick={()=>{dispatch(signOut())}}>Hi {name}</div>
        </OverlayTrigger>

    }


    const submitHandler = async (event: SyntheticEvent, name: string, email: string, pwd: string) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        let payload: userPayload = {
            "name": name,
            "email": email,
            "pwd": pwd
        }

        if (panel === 'Register') {
            dispatch(registerUser(payload))


        } else if (panel === 'Login') {
            dispatch(fetchUser(payload))
        }

        handleClose()
    };




    useEffect(() => {

        dispatch(loadFromCookie())

        const login = document.querySelector('.panelLogin');
        const register = document.querySelector('.panelRegister');

        if (panel === 'Login' && login != null && register != null) {

            login.setAttribute("style", "border-bottom: darkgrey 4px solid");
            register.setAttribute("style", "border-bottom: 0");
        } else if (panel === 'Register' && login != null && register != null) {
            register.setAttribute("style", "border-bottom: darkgrey 4px solid");
            login.setAttribute("style", "border-bottom: 0");
        }

    }, [panel,dispatch])

    return <>
        <div className={'header'}>
            <div className={'headerContent'}>
                <div className={'title'}><a href={"https://zifengallen.me/"}><img className={'an'} src={"../../an.png"}
                    alt={'安'}/></a><Link to={"/"}>Zifeng's Blog</Link></div>
                {loginButton}
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
                <LoginRegisterForm panel={panel} validated={validated} submitHandler={submitHandler}/>
            </div>
        </Modal>
    </>
}