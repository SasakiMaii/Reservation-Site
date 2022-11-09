import './App.scss';
import { Route,BrowserRouter as Router, Routes,Link } from 'react-router-dom';
// import ReservateConfirm from './pages/books/ReservateConfirm';
// import ReservateComplete from './pages/books/ReservateComplete';
// import ReservateHistory from './pages/books/ReservateHistory';
import Gestroom from './pages/rooms/Gestroom';
import SearchResults from './pages/rooms/SearchResults';
import RoomSearch from './pages/rooms/Search';
import Plan from './pages/rooms/Plan';


function App() {
  return (
  <>
{/* <Router >
<Routes>
<Route path='/books/ReservateConfirm' element={<ReservateConfirm/>}></Route>
<Route path='/books/ReservateComplete' element={<ReservateComplete/>}></Route>
<Route path='/books/ReservateHistory' element={<ReservateHistory/>}></Route>
</Routes>
</Router> */}


<Router >
<Routes>
<Route path='/' element={<SearchResults/>}></Route>
<Route path='/RoomSearch' element={<RoomSearch/>}></Route>
<Route path='/Gestroom' element={<Gestroom/>}></Route>
<Route path='/Plan' element={<Plan/>}></Route>
</Routes>
</Router>
</>
  );
}

export default App;
