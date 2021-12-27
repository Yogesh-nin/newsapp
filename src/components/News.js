import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizefirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0
    //     }
    //     // document.title = `${this.capitalizefirstLetter(props.category)} - NewsMonkey`;
    // }
    const updateNews = async () =>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()

        props.setProgress(70);
        setArticles(parsedData.articles)
        setLoading(false)
        setTotalResults(parsedData.totalResults)

        props.setProgress(100);
    }
    useEffect(() =>{
        updateNews()
    }, [])


    const fetchMoreData = async () =>{
        setPage(page+1)
        
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

        props.setProgress(100);
    }

        return (
            <>
                <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - {capitalizefirstLetter(props.category)} top headlines</h1>
                    {loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">
                            <div className="row">
                                {articles.map((ele)=>{
                                    return <div className="col-md-4" key={ele.url}>
                                        <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imageUrl={ele.urlToImage} newsurl={ele.url} author={ele.author?ele.author:"anonymous"} date={ele.publishedAt?ele.publishedAt:""} source={ele.source.name}/>
                                    </div>    
                                })}
                            </div>
                        </div>
                        
                    </InfiniteScroll>
            </>
        )
}
News.defaultProps = {
        country: 'in',
        page: 8,
        category: "general"
    }

News.propTypes = {
        country: PropTypes.string,
        page: PropTypes.number,
        category: PropTypes.string
    }

export default News
