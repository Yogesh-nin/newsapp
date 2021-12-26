import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        page: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        page: PropTypes.number,
        category: PropTypes.string
    }
    capitalizefirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizefirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7b2def1d9933455c91ac591328630a7d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
                        articles: parsedData.articles, 
                        totalResults: parsedData.totalResults,
                        loading: false
                     })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        this.updateNews()
    }
    handlePrevClick = async ()=>{  
        
        this.setState({page: this.state.page - 1})
        this.updateNews()
        
    }
    handleNextClick = async ()=>{
        
        this.setState({page: this.state.page + 1})
        this.updateNews()
        
    }

    render() {
        return (
            <div className="container my-3">
            <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - {this.capitalizefirstLetter(this.props.category)} top headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((ele)=>{
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsurl={ele.url} author={ele.author?ele.author:"anonymous"} date={ele.publishedAt?ele.publishedAt:""} source={ele.source.name}/>
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
