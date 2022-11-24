import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";

import NavBar from "./components/navbar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RighBar";

import { useContext } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AppContext } from "./context/appctx";
import { AuthContext } from "./context/authctx";

//wykorzystanie biblioteki React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { darkTheme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: "5" }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>;
    } else {
      return children;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile/:id",
          element: <Profile key={Date.now()} />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`App ${darkTheme && "darkTheme"}`}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
