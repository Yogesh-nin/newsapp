import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
        let url = `https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
                        articles: parsedData.articles, 
                        totalResults: parsedData.totalResults,
                        loading: false
                     })
    }
    handlePrevClick = async ()=>{  
        let url = `https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
        
    }
    handleNextClick = async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=In&category=business&apiKey=7b2def1d9933455c91ac591328630a7d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
        
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey - top headline</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((ele)=>{
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsurl={ele.url}/>
                        </div>    
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrevClick}> &larr; previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} class="btn btn-dark" onClick={this.handleNextClick}>next &rarr; </button>

                </div>
            </div>
        )
    }
}

export default News
