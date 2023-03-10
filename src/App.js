import Resource from './resource/Resource'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import "./App.css"
import { AuthContext } from "./auth/AuthContext";
import Auth from './auth/Auth';
function App() {

  // const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet/>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (true) {
      return <Navigate to="/auth" />;
    }
    console.log(children)
    return children;
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
          path: "/",
          element: <Resource />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/main", // using this for testing, delete after
      element: <Resource />,
    }
  ]);


  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
    
        
  );
}
export default App;