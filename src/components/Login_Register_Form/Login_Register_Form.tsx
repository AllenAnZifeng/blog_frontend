import React, {SyntheticEvent, useState} from 'react'

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

type Props = {
       validated: boolean,
       submitHandler: (event: SyntheticEvent, email:string,pwd:string) => void

}

export function Login_Register_Form(props:Props) {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    let onSubmit = (e:SyntheticEvent) => {
        props.submitHandler(e,email,pwd)
    };

    return <>
    <Form validated={props.validated} onSubmit={onSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
            required
            type="email"
            placeholder="Email*"
            value={email}
            onChange={e => setEmail( e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
            required
            type="password"
            placeholder="Password*"
            value={pwd}
            onChange={e => setPwd( e.target.value)}
        />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
        </>
}