import React, { useContext, useEffect, useState } from 'react'
import SimpleSlider from '../Slider/Slider'
import axios from 'axios';
import MediaItem from '../MediaItem/MediaItem';
import { useQuery } from 'react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Pagination } from '@mui/material';
import { SearchContext } from '../../SharedData/SearchContext';
import { Helmet } from 'react-helmet';
import Nothing from '../../Nothing-to-show.jpg'
export default function TvShows() {

  let { searchQuery, setSearchBar, setSearchQuery } = useContext(SearchContext);





const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo'
  }
}

// let TvList = []

let [sliderData , setSliderData] = useState([]); 

let [genres , setGenres] = useState([]);

let [genreId, setGenreId] = useState('');

let [pagesNo , setPagesNo] = useState(0) ; 

let [page , setPage] = useState(1);

let [TvList, setTvList] = useState([]); 

let [sliderFlag , setSliderFlag] = useState(true);


async function getTopTv()
{
  let response = await axios.get('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options); 
  setSliderData(response?.data.results);
}

async function GetCategories()
{
  let request = await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=en', options); 
  setGenres(request?.data.genres);
}

  function handleRadioChange(e)
  {
    setGenreId(e.target.value);
  }



  function HandlePageChange(e, p) {
    setPage(p);

  }


function getTv()
{
  if (genreId == '')
    {
        return axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`, options); 

    }else 
    {
      return  axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, options)
    }
}
  let { isLoading, data } = useQuery(['TvList',{ page, genreId}], getTv, {
    cacheTime: 3000000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  // TvList = data?.data.results


  async function searchTv(searchQuery , page)
{
    let response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`, options)
    setTvList(response?.data.results);
    setPagesNo(response?.data.total_pages);
}



useEffect(()=>
{
  getTopTv();
  GetCategories();
  setSearchBar(true);
  setSearchQuery(''); 
},[])



  useEffect(() => {
    if (searchQuery)
    {
      searchTv(searchQuery, page)
      setSliderFlag(false); 
    }else 
    {
      setSliderFlag(true);
    }
    if (data) {
      setPagesNo(data?.data.total_pages);
      setTvList(data?.data.results)
    }
  }, [genreId, page, data, searchQuery]);
  return (
    <>

      <Helmet>
        <title>CineChill | TV Shows</title>
        <meta name='TV Shows page' content='TV Shows page contains all TV shows with various categories and the popular TV shows today' />
      </Helmet>


    <section className="TvShows">
      {isLoading ? <LoadingScreen/>   : 
      
      <div className="container-fluid">
      {sliderFlag && 
      <>
              <h3 className='text-main mx-3 mt-3'>Popular Tv Shows Today</h3>
              <SimpleSlider data={sliderData} />
      </>
      }

    <div className="row">

{sliderFlag &&

      <div className="col-lg-2">
<div className='categories m-2'>

        <h3 className='text-main'>Pick Desired Category </h3>
            <input
              className='form-check-input mx-3 my-2'
              type="radio"
              id={`all`}
              name="genreRadio"
              value={''}
              checked={genreId == ''}
              onChange={(e) => handleRadioChange(e)}
            />
            <label className='text-faded form-check-label' htmlFor={`all`}>{`All`}</label><br />
            {genres.map((genre, index) => (
              <div key={index}>
                <input
                  className='form-check-input mx-3 my-2'
                  type="radio"
                  id={`vehicle${index}`}
                  name="genreRadio" // Set the same name for all radio buttons in the group
                  value={genre.id}
                  checked={genreId == genre.id}
                  onChange={(e) => handleRadioChange(e)}
                />
                <label className='text-faded form-check-label' htmlFor={`vehicle${index}`}>{`${genre.name}`}</label><br />
              </div>
            ))}
</div>
      </div>
}


              <div className={sliderFlag ? `col-lg-10` : `col-lg-12`}>
      
                <div className="row justify-content-center my-3">
                  {TvList.length > 0 ? (
                    TvList.map((TvShow) => (
                      <MediaItem media={TvShow} key={TvShow.id} mediaType={'tv'} />
                    ))
                  ) : (
                    <img src={Nothing} className='w-75 rounded' alt="" />
                  )}
                </div>


      </div>
    </div>


      </div>
      }

        <div className={`d-flex justify-content-center text-main my-4`}>
          <Pagination
            count={pagesNo}
            onChange={HandlePageChange}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </div>



    </section>
    </>
  )
}
