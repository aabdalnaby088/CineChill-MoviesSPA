import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import LayOut from './components/LayOut/LayOut';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { SearchContextProvider } from './SharedData/SearchContext';
import MediaDetails from './components/MediaDetails/MediaDetails';
import Layout2 from './components/Layout2/Layout2';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Offline } from 'react-detect-offline';
function App() {

  const client = new QueryClient() 
  const routes = createHashRouter([
    {
      path: '', element: <LayOut />, children: [
        { index: true, element: <Home /> },
        { path: 'Home', element: <Home /> },
        { path: 'CineChill-MoviesSPA', element: <Home /> },
        { path: 'Details/:mediaType/:MediaId', element: <MediaDetails /> },
        { path: 'item' , element : <Layout2/> , children: [
          { path: 'Movies', element: <Movies /> },
          { path: 'TvShows', element: <TvShows /> },
        ]},
      ]
    }
  ]);



  return (
    <>
      <div className='offlineMessage position-fixed z-3 bottom-0 start-0 m-4 p-2 bg-secondary text-main rounded'>

    <Offline >check your Network Connection</Offline>
    </div>
<QueryClientProvider client={client} >
        <ReactQueryDevtools/>

  <SearchContextProvider>

    <RouterProvider router={routes} />

  </SearchContextProvider>

</QueryClientProvider>



    </>
  );
}

export default App;
