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

  const [filenames, setFilenames] = useState(['']);

  useEffect( () => {

    const fetchData = async () => {
      let result = await fetch('https://api.github.com/repos/AllenAnZifeng/blog_content/contents/contents').then(res => res.json())
      let temp = [];
      for (let i = 0; i < result.length; i++) {
        temp.push(result[i].name)
      }
      setFilenames(temp)
    }
    fetchData().catch(console.error)
  },[]);


  return <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:filename" element={<ArticlePage />} />
    </Routes>
  </Router>
}

export default App;
