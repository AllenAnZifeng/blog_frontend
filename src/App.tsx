import React, {useEffect, useState} from 'react';
import {HomePage} from "./components/HomePage/HomePage";
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {ArticlePage} from "./components/ArticlePage/ArticlePage";



function App() {

  const [data, setData] = useState(['']);

  useEffect( () => {

   console.log(data)
  },[data]);

  return <Router>
    <Routes>
      <Route path="/" element={<HomePage handler={setData} />} />
      <Route path="/blog/:filename" element={<ArticlePage/>} />
    </Routes>
  </Router>
}

export default App;
