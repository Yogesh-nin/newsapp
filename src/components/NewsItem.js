import React from "react";

const NewsItem = (props) => {

        let { title, description, imageUrl, newsurl, author, date, source } = props;
        return (
            <div>
                <div className="card my-3">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }}>
                        <span class="badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                By {author} on {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a
                            rel="noreferrar"
                            href={newsurl}
                            target="_blank"
                            className="btn btn-sm btn-dark"
                        >
                            read more...
                        </a>
                    </div>
                </div>
            </div>
        );
}

export default NewsItem;
