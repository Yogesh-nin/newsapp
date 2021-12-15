import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles})
    }
    render() {
        return (
            <div className="container my-3">
                <h1>NewsMonkey - top headline</h1>
                <div className="row">
                    {this.state.articles.map((ele)=>{
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsurl={ele.url}/>
                        </div>    
                    })}
                </div>
            </div>
        )
    }
}

export default News
