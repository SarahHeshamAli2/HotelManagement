import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/Components/NotFound/NotFound";
import Login from "./modules/Authentictation/Components/Login/Login";
import Registeration from "./modules/Authentictation/Components/Registeration/Registeration";
import Verify from "./modules/Authentictation/Components/Verify/Verify";
import ForgetPassword from "./modules/Authentictation/Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/Authentictation/Components/ResetPassword/ResetPassword";
import ChangePassword from "./modules/Authentictation/Components/ChangePassword/ChangePassword";
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/Components/Dashboard/Dashboard";
import RoomsList from "./modules/Rooms/Components/RoomsList/RoomsList";
import RoomsForm from "./modules/Rooms/Components/RoomsForm/RoomsForm";
import UsersList from "./modules/Users/Components/Users/UsersList";
import FacilitiesList from "./modules/Facilities/Components/Facilities/FacilitiesList";
import LandingPageLayout from "./modules/Shared/Components/LandingPageLayout/LandingPageLayout";
import Home from "./modules/Home/Comonents/Home/Home";
import ExplorePage from "./modules/ExplorePage/Components/ExplorePage/ExplorePage";
import DetailsPage from "./modules/DetailsPage/Components/DetailsPage/DetailsPage";
import Favorites from "./modules/Favorites/Components/Favorites/Favorites";
import AdvertisementsList from "./modules/Advertisements/Components/AdvertisementsList/AdvertisementsList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import BookingList from "./modules/Booking/Components/Booking/BookingList";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
  
        'Poppins',
       
      ].join(','),
    },
  });
    
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },

        { path: "login", element: <Login /> },
        { path: "", element: <Login /> },
        { path: "register", element: <Registeration /> },
        { path: "verify-user", element: <Verify /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },
      ],
    },
    {
      path: "",
      element: <LandingPageLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "home", element: <Home /> },
        { path: "explore", element: <ExplorePage /> },
        { path: "details", element: <DetailsPage /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
    {
      path: "",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "rooms/new-room", element: <RoomsForm /> },
        { path: "rooms/:roomId", element: <RoomsForm /> },
        { path: "users", element: <UsersList /> },
        { path: "advertisments", element: <AdvertisementsList /> },
        { path: "booking", element: <BookingList /> },

        { path: "facilities", element: <FacilitiesList /> },
      ],
    },

  ]);

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />

      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
       
    </ThemeProvider>
    </>
  );
}

export default App;
