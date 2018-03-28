import React from "react";
import Article from "./Article";

function ArticleList(props) {  
    return (
        <div>
            {/* Maps the content of the article array to individual Article components, sending in the data as properties. */}
            {props.articles.map(a => 
                <Article 
                    key={a.id}
                    id={a.id}
                    title={a.title}
                    ingress={a.ingress}
                    date={a.date}
                    url={a.url}
                    image={a.image}
                    tag={a.tag}
                    filterTags={props.filterTags}
                />
            )}
            {props.error.length > 0 && (<div className="card-body d-flex flex-column align-items-start">{props.error}</div>)}
            {props.articles.length === 0 && props.error.length === 0 && (<div className="card-body d-flex flex-column align-items-start">Ingen artikler som passer søket.</div>)}
        </div>
    );
}

export default ArticleList;