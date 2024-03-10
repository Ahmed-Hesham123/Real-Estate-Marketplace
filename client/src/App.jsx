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
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
