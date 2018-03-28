import React from 'react';
import './Title.css';

function Title(props) {
    return (
        <div className="row w-100">
            <h1 className="h2 col-sm-8">{props.title}</h1>
            <h1 className={props.buttonClass} onClick={props.removeFilter}><a href="#">{props.filterButtonText}</a></h1>
        </div>
    );
}

export default Title;