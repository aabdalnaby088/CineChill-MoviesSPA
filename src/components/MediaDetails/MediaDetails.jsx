import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import MediaItem from '../MediaItem/MediaItem';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import { SearchContext } from '../../SharedData/SearchContext';
export default function MediaDetails() {
    let baseVidUrl = 'https://www.youtube.com/watch?v=';
    const baseUrlImg = 'https://image.tmdb.org/t/p/w500'; 

    let { MediaId, mediaType } = useParams();
    let [Id, setId] = useState('');

    if (MediaId != Id)
    setId(MediaId);



let [MediaType, setMediaType] = useState('')

if (mediaType != MediaType)
setMediaType(mediaType);

    let { setSearchBar } = useContext(SearchContext) ; 
    let [details, setDetails] = useState(null);
    let [Videos, setVideo] = useState([]);
    let [related, setRelated] = useState([]);
    let [isLoading , setIsLoading] = useState(false); 
    useEffect(
        () => {
            setId(MediaId);
            setMediaType(mediaType);
            setSearchBar(false); 
            if (MediaType && Id) {
                getMediaDetails(Id, MediaType);
                GetVideos(Id, MediaType);
                getRelated(Id, MediaType)
            }
        }, [Id, MediaType ]
    )


    async function getMediaDetails(Id, MediaType) {
        setIsLoading(true); 
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
            },
        };


        if (MediaType == 'tv') {
            let response = await axios.get(`https://api.themoviedb.org/3/tv/${Id}?language=en-US`, options);
            setDetails(response.data)
        }
        else {
            let response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}?language=en-US`, options);
            setDetails(response.data)
        }
        setIsLoading(false); 
    }


    async function GetVideos(Id, MediaType) {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
            },
        };
        if (MediaType == 'tv') {
            let response = await axios.get(`https://api.themoviedb.org/3/tv/${Id}/videos`, options);
            if (response.data.results.length > 0)
                setVideo(baseVidUrl + `${response.data.results[0].key}`)
            else {
                setVideo(undefined);
            }
        }
        else {
            let response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}/videos`, options);
            if (response.data.results.length > 0)
                setVideo(baseVidUrl + `${response.data.results[0].key}`)
            else
            {
                setVideo(undefined) ; 
            }
        }

    }
// console.log(Videos) 
    async function getRelated(Id, MediaType) {


        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
            },
        };

        if (MediaType == 'tv') {
            let response = await axios.get(`https://api.themoviedb.org/3/tv/${Id}/similar?language=en-US&page=1`, options)
            setRelated(response.data.results);
        } else {
            let response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}/similar?language=en-US&page=1`, options)
            setRelated(response.data.results);
        }


    }


    
    return (
        <>
<Helmet>
                <title> {`CineChill | ${details?.title ? details?.title : details?.name}`} </title>
                <meta name='Movie details'  />
</Helmet>


        {isLoading ? <LoadingScreen/> :



    
            <section className="details container">
                <div className="Info row">
                    <div className='col-lg-8'>
                        <div className="media my-5 d-flex justify-content-center">
                            {Videos ?
                                <ReactPlayer url={Videos} playing={true} controls={true} loop={true} width='75%'/>
                                : <img src={baseUrlImg + details?.poster_path} className='w-50' alt="" />
                            }
                        </div>
                    </div>
                    <div className='col-lg-4 '>
                        <div className="content my-5">
                            <h4 className='text-main'>{details?.title ? details?.title : details?.name}</h4>
                            <p className='text-faded'>{details?.overview}</p>
                            <div className='genre d-flex justify-content-between my-4'>
                                {details?.genres.length > 0 && (
                                    <>
                                        {details.genres.map((genre) => (
                                            <span key={genre.id} className='badge bg-danger mx-1'>
                                                {genre.name}
                                            </span>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className='d-flex justify-content-between'>
                                {MediaType == 'tv' ?  
                                
                                <p className='text-main'> Episodes : <span className='text-faded'>{details?.number_of_episodes} </span> </p>
                                : 
                                <p className='text-main'> Budget : <span className='text-faded'>${details?.budget} </span>   </p>
                            
                                }
                                <p className='text-main'> Release date : <span className='text-faded'>{details?.first_air_date ? details?.first_air_date : details?.release_date} </span> </p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h4 className='text-main'>⭐ {details?.vote_average.toFixed(1)}</h4>
                                {MediaType == 'tv' ? <h5 className='text-faded'>Seasons : {details?.number_of_seasons} </h5>  : 
                                    <h5 className='text-faded'>{details?.runtime && details?.runtime }min</h5>
                                }
                                
                            </div>
                            <h3 className='text-main text-center'>{MediaType== 'tv' ? 'Tv Show' : 'Movie'}</h3>
                        </div>

                    </div>
                </div>

<div className="related">
                    <div className="row">
                        {related.length ? (
                            <>
                                <h4 className='text-main text-center my-5'>
                                    Because you interested in{' '}
                                    <span style={{ color: '#FC4747' }}>
                                        {details?.title ? details?.title : details?.name}
                                    </span>
                                </h4>
                                {related.map((item, index) => (
                                    <MediaItem key={index} media={item} mediaType={MediaType} width = '75%' />
                                ))}
                            </>
                        ) : (
                            <div className='text-main'>
                                <h3 className='text-center'>
                                    Nothing related to{' '}
                                    <span style={{ color: '#FC4747' }}>
                                        {details?.title ? details?.title : details?.name}
                                    </span>
                                </h3>
                            </div>
                        )}
                    </div>

</div>

            </section>
    
    }
        </>
    )
}