import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskCards from "./Components/TaskCards";
import LoginForm from "./Components/LoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInForm from "./Components/SignInForm";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/Login",
      element: <LoginForm />,
    },
    {
      path: "/HomeTasks",
      element: <TaskCards />,
    },
    {
      path: "/SignUp",
      element: <SignInForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
        <TaskCards />
      </RouterProvider>
    </>
  );
}

export default App;
