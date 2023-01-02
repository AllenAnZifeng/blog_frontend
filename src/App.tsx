import React from 'react';
import {HomePage} from "./components/HomePage/HomePage";
import './App.scss';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import {ArticlePage} from "./components/ArticlePage/ArticlePage";



function App() {

  const router = createHashRouter([
    {
      path: "/",
      element: <HomePage/>,
      errorElement:<div>404</div>
    },
    {
      path: "/blog/:filename",
      element: <ArticlePage/>
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
