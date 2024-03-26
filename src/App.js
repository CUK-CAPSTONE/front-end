import './App.css';
import Main from './components/Main';
import GlobalStyle from './style/GlobalStyle';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ThreeD from './components/ThreeD';
import TestApi from './components/TestApi';

function App() {
  return (
   <>
   <GlobalStyle/>
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/three' element={<ThreeD/>}/>
      <Route path='/api' element={<TestApi/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
