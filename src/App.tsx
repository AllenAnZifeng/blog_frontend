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


  const [data, setData] = useState(Array<{filename: string,title: string, time: string, description: string, category: string, tags: string[], data: string}>);

  useEffect( () => {

  },[data]);

  return <Router>
    <Routes>
      <Route path="/" element={<HomePage handler={setData} />} />
      <Route path="/blog/:filename" element={<ArticlePage data={data}/>} />
    </Routes>
  </Router>
}

export default App;
