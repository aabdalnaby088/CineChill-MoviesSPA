import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SimpleSlider from '../Slider/Slider';
import MediaItem from '../MediaItem/MediaItem';
import { Pagination } from '@mui/material';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { SearchContext } from '../../SharedData/SearchContext';
import { Helmet } from 'react-helmet';
import Nothing from '../../Nothing-to-show.jpg'

export default function Movies() {

  let { setSearchBar, setSearchQuery } = useContext(SearchContext);


  let { searchQuery } = useContext(SearchContext);
  let [sliderData, setSliderData] = useState([]);
  let [categories, setCategories] = useState([]);
  let [pagesNo, setPagesNo] = useState(0);
  let [Movies, setMovies] = useState([]);
  let [genreId, setGenreId] = useState('');
  let [page, setPage] = useState(1);
  let [sliderFlag, setSliderFlag] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  async function getTopMovies() {
    let options = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
      },
    };

    let response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      options
    );
    setSliderData(response.data.results);
  }

  async function GetCategories() {
    let options = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
      },
    };

    let response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      options
    );
    setCategories(response.data.genres);
  }



  function HandlePageChange(e, p) {
    setPage(p);

  }




  function handleRadioChange(e) {
    // console.log(`Checkbox at index ${e.target.value} changed`);
    setGenreId(e.target.value);
  }

  async function getMovies(genreId, page) {

    setIsLoading(true);


    let options = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo',
      },
    };



    if (genreId == '') {
      let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`, options).catch(err => { });
      setPagesNo(response.data.total_pages);
      setMovies(response?.data.results);

    } else {
      let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, options).catch(err => { });
      setPagesNo(response.data?.total_pages);
      setMovies(response.data.results);
    }


    setIsLoading(false);


  }


  async function searchMovies(searchQuery, page) {
    setIsLoading(true);
    let options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDIzY2NmMmIyOGJiY2FhNTI5MDA1NDQzZGE0ZjdmMSIsInN1YiI6IjY1ZGNlNWYxZWVhMzRkMDE2NGIwZjc2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnegR44hOU51nho-ThOw2pBVFXpedO5GG0gfLxdLmbo'
      }
    }
    let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=${page}`
      , options);
    setMovies(response.data.results);
    setPagesNo(response.data.total_pages);
    setIsLoading(false);

  }


  useEffect(() => {
    getTopMovies();
    GetCategories();
    setSearchBar(true);
    setSearchQuery('');
    // getMovies(genreId);

  }, []);


  useEffect(() => {
    if (searchQuery) {
      setSliderFlag(false);
      searchMovies(searchQuery, page);
    }
    else {
      setSliderFlag(true);
      getMovies(genreId, page);
    }
  }
    , [genreId, page, searchQuery])


  return (
    <>
      <Helmet>
        <title>CineChill | Movies</title>
        <meta name='Movies page' content='Movies page contains all movies with various categories and the popular moves today' />
      </Helmet>
      <section className="movies">
        {isLoading ? (<LoadingScreen />) :


          (

            <div className=".container-fluid">
              {sliderFlag &&
                <h3 className='text-main mx-3 mt-3'>Popular Movies Today</h3>
              }
              {sliderFlag && <SimpleSlider data={sliderData} />}
              <div className="row m-0">
                {sliderFlag &&

                  <div className="col-lg-2">
                    <div className="categories m-2">
                      <h3 className="text-main">Pick Desired Category</h3>
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
                      {categories.map((genre, index) => (
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
                <div className={sliderFlag ? 'col-lg-10' : 'col-lg-12'}>
                  <div className="row justify-content-center my-3">
                    {Movies.length > 0 ? (
                      Movies.map((movie) => (
                        <MediaItem media={movie} key={movie.id} mediaType={'Movie'} />
                      ))
                    ) : (
                        <img src={Nothing} className='w-75 rounded' alt="" />
                    )}
                  </div>

                </div>

              </div>
            </div>

          )

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

  );
}
