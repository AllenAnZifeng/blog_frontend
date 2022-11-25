import './Card.scss'
import { Link } from "react-router-dom";
import {article} from "../../features/articles/allArticleSlice";

type Props = {
    data: article

}

export function Card(props: Props) {

    return <Link to={"/blog/"+props.data.filename} className={'cards'}>
                <div className={'cards-title'}>{props.data.title}</div>
                <div className={'cards-description'}>{props.data.description}</div>
                <div className={'cards-footer'}>
                    <div className={'cards-time'}>{props.data.time}</div>
                    <div className={'cards-category'}>{props.data.category}</div>
                </div>
            </Link>
}