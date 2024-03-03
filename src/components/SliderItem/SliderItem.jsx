import React from 'react'
import cover from '../../slider.jpg'
import styles from './SliderItem.module.css'
import { Link } from 'react-router-dom';
export default function SliderItem({media}) {
    const baseUrlImg = 'https://image.tmdb.org/t/p/w500'; 

    return (
    <>
            <div>
                <div className={`itemHolder p-1 position-relative`}>
                    <Link to={`/Details/${media.media_type}/${media.id}`}>
                    <img src={baseUrlImg + media?.backdrop_path} className="w-100" alt="" />
                    </Link>
                    <div className={`${styles.Details} px-2`}>
                        <p className='text-main my-1'>
                            <span>{media?.first_air_date ? media?.first_air_date.slice(0, 4) : media?.release_date?.slice(0, 4)}  |</span>
                            <span>  {(media?.media_type == 'tv' ? 'Tv Show' : 'Movie')}  |</span>
                            <span> {media?.vote_average?.toFixed(1)} </span>
                        </p>
                        <h5 className='text-main'>{media?.title ? media?.title : media?.name}</h5>
                    </div>
                </div>
            </div>
    </>
    )
}
