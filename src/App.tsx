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
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminMain from "./admin/AdminMain";
import AdminDashboardHome from "./admin/AdminDashboardHome";
import ManageUser from "./admin/ManageUser";
import ManageHome from "./admin/component/home/ManageHome";
import ManageOurService from "./admin/component/home/ManageOurService";
import ManageRcmMenu from "./admin/component/home/ManageRcmMenu";
import ManaBoardDetail from "./admin/component/home/ManaBoardDetail";
import ManageAnnouncement from "./admin/component/annountment/ManageAnnouncement";
import ManageBranches from "./admin/component/branches/ManageBranches";
import Login from "./login/Login";
import ProtextAdmin from "./admin/ProtextAdmin";
import { Toaster } from "sonner";
import { JobRequire } from "./admin/component/jop_require/JopRequire";
import ManageContact from "./admin/component/contact/ManageContact";

const App: React.FC = () => {
  return (
    <TooltipProvider>
      <Toaster position="top-center" richColors closeButton />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* ADMIN PAGE (Clean slate for Sidebar) */}
          <Route element={<ProtextAdmin />}>
            <Route path="/admin" element={<AdminMain />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="manageuser" element={<ManageUser />} />
              <Route path="managehomecover" element={<ManageHome />} />
              <Route path="manageourservices" element={<ManageOurService />} />
              <Route path="managemenurecommend" element={<ManageRcmMenu />} />
              <Route path="manageboarddetail" element={<ManaBoardDetail />} />
              <Route path="managejobrequire" element={<JobRequire />} />
              <Route path="managecontact" element={<ManageContact />} />
              <Route
                path="manageannouncement"
                element={<ManageAnnouncement />}
              />
              <Route path="managebranches" element={<ManageBranches />} />
            </Route>
          </Route>

          {/* PUBLIC PAGES (With Navbar and Footer) */}
          <Route
            path="*"
            element={
              <>
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
              </>
            }
          />
        </Routes>
      </Router>
    </TooltipProvider>
  );
};

export default App;
