import React from 'react';
import {HomePage} from "./components/HomePage/HomePage";
import './App.scss';
import {
   HashRouter,
   Routes,Route
} from "react-router-dom";
import {Body} from "./components/Body/Body";
import {Article} from "./components/Article/Article";


function App() {


  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}>
        <Route
            path="/"
            element={<Body/>}
        />
        <Route path="/blog/:filename"
               element={<Article/>}
        />
      </Route>
    </Routes>
  </HashRouter>

}

export default App;
