import Home from './pages/Home';
import Details from './pages/Details';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GlobalStyle from './GlobalStyle'

//TODO : 버전 아이디 766아니면 수정
axios.defaults.baseURL = 'https://localhost:7700/rest/api/v1/versions/766';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
