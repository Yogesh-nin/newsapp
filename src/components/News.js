import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }
    handlePrevClick = async ()=>{  
        let url = `https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        })
        
    }
    handleNextClick = async ()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
            
            let url = `https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1
            })
        
        }
        
        
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
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrevClick}> &larr; previous</button>
                <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>next &rarr; </button>

                </div>
            </div>
        )
    }
}

export default News
