// src/router.jsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import MainPage from "./pages/Mainpage.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Mainpage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;