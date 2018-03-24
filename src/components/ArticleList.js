import React from "react";
import Article from "./Article";

function ArticleList(props) {  
    return (
        <div>
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
                />
            )}
        </div>
    );
}

export default ArticleList;