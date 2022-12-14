import './App.scss';
import Plan from './pages/rooms/Plan';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import ReservateConfirm from './pages/books/ReservateConfirm';
import ReservateComplete from './pages/books/ReservateComplete';
import ReservateHistory from './pages/books/ReservateHistory';
import Gestroom from './pages/rooms/Gestroom';
import RoomSearch from './components/Templates/Search';
import { Registered } from './pages/users/Registered';
import { Login } from './pages/users/Login';
import Top from './pages/Top';
import RoomDetails from './pages/rooms/RoomDetails';
import NotFound from './pages/NotFound';
import Header from "../src/components/layout/Header";
import PlanDetails from './pages/rooms/PlanDetails';
import Contact from './pages/books/Contact';
import ScrollTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Router >
        <ScrollTop />
        <Routes>
          <Route path='/books/ReservateConfirm' element={<ReservateConfirm />}></Route>
          <Route path='/books/ReservateComplete' element={<ReservateComplete />}></Route>
          <Route path='/books/ReservateHistory' element={<ReservateHistory />}></Route>
          <Route path='/books/Contact' element={<Contact />}></Route>
          <Route path='/' element={<Top />}></Route>        
          <Route path='/rooms/RoomPlanSearch' element={<RoomSearch />}></Route>
          <Route path='/rooms/Gestroom' element={<Gestroom />}></Route>
          <Route path='/users/Login' element={<Login />}></Route>
          <Route path='/rooms/Plan' element={<Plan/>}></Route>
          <Route path='/rooms/RoomDetails' element={<RoomDetails/>}></Route>
          <Route path='/users/Register' element={<Registered />}></Route>
          <Route path='/rooms/RoomDetails/:id' element={<RoomDetails />}></Route>
          <Route path='/rooms/PlanDetails' element={<PlanDetails/>}></Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
