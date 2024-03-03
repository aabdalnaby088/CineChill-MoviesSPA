import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';  // Import NavLink
import styles from './NavBar.module.css';
import { SearchContext } from '../../SharedData/SearchContext';
export default function NavBar() {

  let { searchBar } = useContext(SearchContext);

  // useEffect(() => {
  //   const screenWidth = window.innerWidth;

  //   if (screenWidth < 550) {
  //     const navbarToggleBtn = document.getElementById('navbarToggleBtn');

  //     if (navbarToggleBtn ) {
  //       navbarToggleBtn.click();
  //       navbarToggleBtn.style.display = 'none';
  //     }
  //   }
  // }, []);


  //calling search context to set search state and update it

  let { setSearchQuery } = useContext(SearchContext);

//function to set searchQuery on input  

function searchInput(e)
{
// console.log(e.target.value) ; 
  setSearchQuery(e.target.value)
}

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.nav}`}>
        <div className="container ">
          <Link className={`navbar-brand `} style={{ color: '#FC4747' }} to="Home"> <span><i className="fa-solid fa-clapperboard fa-2x"></i></span></Link>
          <button id='navbarToggleBtn' className={`navbar-toggler ${styles.toggle}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`navbar-toggler-icon`}></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {searchBar && 
            
            <form onChange={searchInput} onBlur={searchInput} className="d-flex mx-4" role="search">
              <input className={`form-control me-2 border-0`} type="search" placeholder="Search Your Fav" aria-label="Search" />
            </form>
            }
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item mx-2`}>
                <NavLink className={`nav-link ${styles.iconColor}`} to="Home"> <span className='mx-2'>Home</span> <span><i className="fa-solid fa-house"></i></span></NavLink>
              </li>
              <li className={`nav-item mx-2`}>
                <NavLink className={`nav-link ${styles.iconColor}`} to="item/movies"><span className='mx-2'>Movies</span><i className="fa-solid fa-film"></i></NavLink>
              </li>
              <li className={`nav-item mx-2`}>
                <NavLink className={`nav-link ${styles.iconColor}`} to="item/TvShows"><span>Tv Shows</span> <i className="fa-solid fa-tv"></i> </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
