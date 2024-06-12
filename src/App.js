import './App.css';
import Main from './page/Main';
import GlobalStyle from './style/GlobalStyle';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import NotFound from './page/NotFound';
import ThreeD from './page/ThreeD';
import TestApi from './components/TestApi';
import ThreeDreal from './page/ThreeDreal';
import PayCheck from './page/PayCheck';

function App() {
  return (
   <>
   <GlobalStyle/>
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/three' element={<ThreeDreal/>}/>
      <Route path='/api' element={<TestApi/>}/>
      <Route path='/tt' element={<ThreeDreal/>}/>
      <Route path="/payment" element={<PayCheck/>} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
