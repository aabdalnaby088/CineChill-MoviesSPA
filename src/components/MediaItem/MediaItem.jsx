import React from 'react';
import { Link } from 'react-router-dom';

export default function MediaItem({ media, mediaType }) {
    const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

    return (
        <>
            <div className="col-lg-3">
                <div className="mediaHolder">
                    <Link to={`/Details/${media.media_type ? media.media_type : mediaType}/${media.id}`}>
                        {media.poster_path && (
                            <img src={baseUrlImg + media.poster_path} className='w-100 rounded' alt="" />
                        )}
                    </Link>
                    <div className="details my-3">
                        <p className='text-faded my-1'>
                            <span>{media?.first_air_date ? media?.first_air_date.slice(0, 4) : media?.release_date?.slice(0, 4)}  |</span>
                            <span>  {(media?.media_type == 'tv' ? 'Tv Show' : 'Movie')}  |</span>
                            <span> {media?.vote_average?.toFixed(1)} </span>
                        </p>
                        <h5 className='text-main'>{media?.title ? media?.title : media?.name}</h5>
                        <p className='text-desc'>{media?.overview?.slice(0, 200)}....</p>
                    </div>
                </div>
            </div>
        </>
    );
}
