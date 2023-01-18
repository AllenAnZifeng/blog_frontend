import React, {SyntheticEvent, useEffect, useState} from 'react'
import style from './Comment.module.scss'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUserName, selectUserStatus, selectUserToken, signOut} from "../../features/user/userSlice";
import {ip_addr} from "../../util";

type commentPayload = {
    authorName: string, blogID: string, comment: string, token: string
}

type fetchedComment = {
    id: number, authorName: string, blogID: string, content: string,time: string
}

export type Props = {
    blogID: string
}

export function Comment(props: Props) {

    let status = useAppSelector(selectUserStatus)
    let authorName = useAppSelector(selectUserName)
    let token = useAppSelector(selectUserToken)

    const [comment, setComment] = useState('');
    const [previousComment, setPreviousComment] = useState<fetchedComment[]>([]);
    const dispatch = useAppDispatch()

    const submitHandler = async (event: SyntheticEvent) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }

        if (status === 'Guest') {
            alert('Please Sign in to comment')
            return
        }

        let payload: commentPayload = {
            authorName: authorName,
            blogID: props.blogID,
            comment: comment,
            token: token
        }


        let res = await fetch(ip_addr + "/api/comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            redirect: 'follow'
        });
        const response = await res.json()

        if (response.status === 200) {
            alert('Comment Posted')
            window.location.reload()
        } else if (response.message === "Invalid Token!" || response.message === "User not Found!") {
            dispatch(signOut())
            console.log(response)
            alert('Comment Failed! Please Sign in again!')

        } else {
            alert('Comment Failed!')
            console.log(response)
        }


        setComment('')
    }

    const fetchComment = async () => {
        let res = await fetch(ip_addr + "/api/comment/" + props.blogID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        });
        const response = await res.json()

        if (response.status === 200) {
            return JSON.parse(response.message)
        } else {
            return []
        }
    }

    useEffect(() => {
        fetchComment().then((res) => {
            setPreviousComment(res)
        })
    }, [])

    let comments;

    const timeParser = (time: string) => {
        let date = new Date(parseInt(time))
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + '-' + month + '-' + day
    }

    if (previousComment.length > 0) {
        comments = previousComment.map((comment:fetchedComment, index) => {
            return (
                <div key={index} className={style.comment}>
                    <div className={style.commentAuthor}>{comment.authorName}:</div>
                    <div>{comment.content}</div>
                    <div>{timeParser(comment.time)}</div>
                </div>
            )
        })
        // console.log(comments)
    } else {
        comments = <div>No comments yet.</div>;
    }


    return <div className={style.comment}>
        <div className={style.commentDivider}></div>
        <div className={style.commentTitle}>Comments</div>
        {comments}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="CommentInputText">
                <Form.Label>You can comment here:</Form.Label>
                <Form.Control as="textarea" rows={3}
                              required
                              value={comment}
                              placeholder="Comment*"
                              onChange={e => setComment(e.target.value)}
                />
            </Form.Group>
            <Button className={"mb-3 mt-3"} variant="outline-primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
}