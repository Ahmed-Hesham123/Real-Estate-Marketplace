import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Root,
  Home,
  About,
  Profile,
  SignIn,
  SignUp,
  Error,
  CreateListing,
  UpdateListing,
  Listing,
  Search
} from "./pages/index";
import { PrivateRoute } from "./components/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/listing/:listingId",
        element: <Listing />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/create-listing",
            element: <CreateListing />,
          },
          {
            path: "/update-listing/:id",
            element: <UpdateListing />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
