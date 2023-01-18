import style from './Card.module.scss'
import { Link } from "react-router-dom";
import {article} from "../../features/articles/allArticleSlice";

type Props = {
    data: article

}

export function Card(props: Props) {

    return <Link to={"/blog/"+props.data.filename} className={style.cards}>
                <div className={style.cardsTitle}>{props.data.title}</div>
                <div className={style.cardsDescription}>{props.data.description}</div>
                <div className={style.cardsFooter}>
                    <div>{props.data.time}</div>
                    <div>{props.data.category}</div>
                </div>
            </Link>
}