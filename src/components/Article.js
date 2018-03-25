import React from 'react';
import DateJS from 'datejs';
import './Article.css';

function Article(props) {
    var propDate = new Date(props.date);
    var dateStr = propDate.toString("dd.MM.yyyy");

    return (
        <div className="Article">
                <img src={props.image} alt=""/>
                <div className="articleContainer">
                    <h2>{props.title}</h2>
                    <p>{props.ingress}</p>
                    <a href={props.url} className="btn">Les Full Artikkel</a>
                <p className="date">Gitt ut {dateStr}</p>
                </div>
        </div>
    );
}

export default Article;