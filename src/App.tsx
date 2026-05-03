import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Branches from "./component/Branches";
import ScrollToTop from "./component/ScrollToTop";
import Footer from "./component/Footer";
import Credit from "./component/Credit";
import AboutUs from "./component/AboutUs";
import Fanchise from "./component/Fanchise";
import Menus from "./component/Menus";
import Contract from "./component/Contract";
import NewDetail from "./component/NewDetail";
import ArticlePage from "./component/component/ArticlePage";
import JoinOurTeam from "./component/JoinOurTeam";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/fanchise" element={<Fanchise />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/news" element={<NewDetail />} />
        <Route path="/joinus" element={<JoinOurTeam />} />
        <Route path="/news/:id" element={<ArticlePage />} />
      </Routes>

      <Footer />

      <Credit />
    </Router>
  );
};

export default App;
