import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className="container my-3">
                <h1>newsMonkey - top headline</h1>

                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc"/>
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc"/>
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc"/>
                    </div>
                </div>

                {/* This is news component
               
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/> */}
            </div>
        )
    }
}

export default News
