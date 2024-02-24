import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Root,
  Home,
  About,
  Profile,
  SignIn,
  SignUp,
  Error,
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
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
