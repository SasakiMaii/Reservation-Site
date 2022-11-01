import './App.scss';
import { Link, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import RoomSearch from './pages/rooms/Search';
import SearchResults from './pages/rooms/SearchResults';
import GestroomPlan from './pages/rooms/GestroomPlan';


function App() {
  return (
<>
<Router >
<Routes>
<Route path='/' element={<SearchResults/>}></Route>
<Route path='/RoomSearch' element={<RoomSearch/>}></Route>
<Route path='/GestroomPlan' element={<GestroomPlan/>}></Route>
</Routes>
</Router>
</>
  );
}

export default App;

