import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/index.js'
import Chat from './pages/Chat/index.js'

function App() {
  

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chats" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;