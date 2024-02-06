import React from "react";
import Body from "./Components/Body";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CharacterInfo from "./Components/CharacterInfo";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/character/:chId",
        element: <CharacterInfo />,
      },
    ],
  },
]);


export default App;
