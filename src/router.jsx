// src/router.jsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import ChatPage from "./pages/ChatPage.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ChatPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;