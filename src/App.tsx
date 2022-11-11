import './App.scss';

import Gestroom from './pages/rooms/Gestroom';
import Plan from './pages/rooms/Plan';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import ReservateConfirm from './pages/books/ReservateConfirm';
import ReservateComplete from './pages/books/ReservateComplete';
import ReservateHistory from './pages/books/ReservateHistory';
import GestroomPlan from './pages/rooms/Gestroom';
import SearchResults from './pages/rooms/SearchResults';
import RoomSearch from './pages/rooms/Search';
import { Registered } from './pages/users/Registered';
import { Login } from './pages/users/Login';
import Top from './pages/Top';


function App() {
  return (
    <>


      <Router >
        <Routes>
          <Route path='/books/ReservateConfirm' element={<ReservateConfirm />}></Route>
          <Route path='/books/ReservateComplete' element={<ReservateComplete />}></Route>
          <Route path='/books/ReservateHistory' element={<ReservateHistory />}></Route>
          <Route path='/' element={<SearchResults />}></Route>
          <Route path='/rooms/RoomSearch' element={<RoomSearch />}></Route>
          <Route path='/rooms/Gestroom' element={<Gestroom />}></Route>
          <Route path='/users/Login' element={<Login />}></Route>
          <Route path='/rooms/Plan' element={<Plan/>}></Route>
          <Route path='/users/Registered' element={<Registered />}></Route>
          <Route path='/Top' element={<Top />}></Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;
