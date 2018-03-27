import React from 'react';
import DateJS from 'datejs';
//import './Article.css';

var imageStyle = {
    width: 'auto',
    height: '210px'
};

function Article(props) {
    var propDate = new Date(props.date);
    var dateStr = propDate.toString("dd.MM.yyyy");
    var ucTag = capitalizeFirstLetter(props.tag);

    return (
        <div className="row mb-4">
            <div className="col-md-12">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                    <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-primary">{ucTag}</strong>
                        <h3 className="mb-0"><a href={props.url} className="text-dark">{props.title}</a></h3>
                        <div className="mb-1 text-muted">{dateStr}</div>
                        <p className="card-text mb-auto">{props.ingress}</p>
                        <a href={props.url}>Les mer...</a>
                    </div>
                    <img src={props.image} alt="" className="card-img-right d-none d-md-block img-fluid" style={imageStyle}/>
                </div>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Article;