import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/index.js'
import Pdfpage from './components/PdfPage/index.js';

function App() {
  

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pdfpage" element={<Pdfpage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;