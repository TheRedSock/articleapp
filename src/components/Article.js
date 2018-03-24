import React from 'react';
import DateJS from 'datejs';
import './Article.css';

function Article(props) {
    var propDate = new Date(props.date);
    var dateStr = propDate.toString("dd.MM.yyyy");

    return (
        <div className="Article">
                <h2>{props.title}</h2>
                <p>{props.ingress}</p>
                <a href={props.url}>Les Full Artikkel</a>
                <img src={props.image} alt=""/>
                <p className="date">{dateStr}</p>
        </div>
    );
}

export default Article;