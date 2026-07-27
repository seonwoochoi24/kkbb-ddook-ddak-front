// src/layouts/MainLayout.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/common/Header.jsx";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;