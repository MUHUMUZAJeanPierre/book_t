import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import DashboardAbout from "./pages/DashboardAbout";
import Layout_web from "./components/Layout_web";
import Home from "./pages/Home";
import HeroSlider from "./components/HeroSlider";
import BookDetail from "./pages/BookDetail";
import Auth from "./components/Auth";
import Admin from "./pages/Admin";
import Category from "./components/Categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout_web />}>
          <Route index element={<Home />} />
          <Route path="home" element={<HeroSlider />} />
        </Route>

          <Route path="/login" element={<Auth />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="/dashboard/library" element={<DashboardHome />} />
          <Route path="/dashboard/library/:id" element={<BookDetail />} />
          <Route path="/dashboard/record" element={<DashboardAbout />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/:category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

