import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import LandingPageNavbar from "../LandingPageNavbar/LandingPageNavbar";
import BackToTopButton from "../../BackToTopButton/BackToTop";
export default function LandingPageLayout() {
  return (
    <>
      <LandingPageNavbar />
      <Outlet />
      <Footer />
      <BackToTopButton/>
    </>
  );
}
