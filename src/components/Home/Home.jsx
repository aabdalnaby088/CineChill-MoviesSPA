import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MediaItem from '../MediaItem/MediaItem';
import { Pagination, Slide } from '@mui/material';
import { SearchContext } from '../../SharedData/SearchContext';
import SimpleSlider from '../Slider/Slider';
import { Helmet } from 'react-helmet';
import Nothing from '../../Nothing-to-show.jpg'

export default function Home() {

    let { setSearchBar, setSearchQuery } = useContext(SearchContext);
    setSearchBar(true);
    setSearchQuery(''); 

    let { searchQuery } = useContext(SearchContext);

    let [page, setPage] = useState(1);
    let [Media, setMedia] = useState([]);
    let [pagesNo, setPagesNo] = useState(0);
    let [SliderData , setSliderData] = useState([]);
    let [sliderFlag , setSliderFlag] = useState(true);
    const { isLoading, data, error } = useQuery(['GetAllMedia', page], getTopAll, {
        cacheTime: 300000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    function getTopAll() {
        return axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=5d23ccf2b28bbcaa529005443da4f7f1&page=${page}`);
    }

    async function getBySearch(searchQuery) {
        let options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
            },
        };
        let response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=true&language=en-US&page=${page}`,
            options
        );
        setPagesNo(response.data?.total_pages);
        setMedia(response.data?.results);
    }

    useEffect(() => {
        if (searchQuery) {
            setSliderFlag(false); 
            getBySearch(searchQuery);
        } else {
            getSliderData();
            setSliderFlag(true);
            setPagesNo(data?.data.total_pages);
            setMedia(data?.data.results);
        }
    }, [searchQuery, page, data ]);

    function HandleChange(e, p) {
        setPage(p);
    }

async function getSliderData()
{
    let options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
        },
    };
    let response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
        options
    ).catch(err => {});
    // console.log(response.data.results);
    setSliderData(response.data.results)
}


    return (
        <>
            <Helmet>
                <title>CineChill | Home</title>
                <meta name='Home page to show the most popular media today and recommended media to start' content='todays popular media and recommendation for you' />
            </Helmet>
            <section className="home my-5">
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {sliderFlag && (
                            <>
                                <h2 className='text-main ms-4 mt-4'>Popular Today</h2>
                                <SimpleSlider data={SliderData} />
                                <h2 className='text-main ms-4 my-4'>Recommended For You</h2>
                            </>
                        )}

                        <div className="container">
                            <div className="row g-4">
                                {Media?.length > 0 ?
                                    Media.map(mediaItem => (
                                        <MediaItem key={mediaItem.id} media={mediaItem} />
                                    ))
                                    :
                                        <img src={Nothing} alt="" />
                                }
                            </div>
                        </div>
                    </>
                )}

                <div className={`d-flex justify-content-center text-main my-4`}>
                    <Pagination
                        count={pagesNo}
                        onChange={HandleChange}
                        shape="rounded"
                        variant="outlined"
                        color="primary"
                    />
                </div>
            </section>
        </>
    );

}
