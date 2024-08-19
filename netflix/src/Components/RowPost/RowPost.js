import React, { useState,useEffect } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'



function RowPost(props) {

    const [movie, setMovie] = useState([])
    const [urlId,setUrlId] = useState('')

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
    };


    useEffect(() => {
        axios.get(props.url).then(response=>{
            console.log("rowpost",response)
            setMovie(response.data.results)
        })
    }, [])
    
    const handleMovie = (id)=>{
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if (response.data.results.length!=0){
                setUrlId(response.data.results[0])
            }else{
                console.log("array empty")
            }
        })
    }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movie.map((obj)=>
                     <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} alt='posters' src={`${imageUrl+obj.backdrop_path}`} />
                )}
            </div>
            {urlId && <Youtube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default RowPost