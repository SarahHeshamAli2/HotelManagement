import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import LandingPageNavbar from "../LandingPageNavbar/LandingPageNavbar";
import BackToTopButton from "../../BackToTopButton/BackToTop";
export default function LandingPageLayout() {
  let {pathname} = useLocation();
  const paymentPathRegex = /^\/booking\/[^/]+\/(user-info|Payment-info|booking-success)$/;
  console.log(pathname)
  return (    
    <>
    
    {!paymentPathRegex.test(pathname) && <LandingPageNavbar />}
      <Outlet />
      {!paymentPathRegex.test(pathname) && <Footer />}
      <BackToTopButton/>
    </>
  );
}
