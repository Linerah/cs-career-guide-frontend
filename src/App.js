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
import Quiz from "./quiz/quiz";
function App() {

  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet/>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
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
          path: "/home",
          element: <Resource />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    }
  ]);


  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
    
        
  );
}
export default App;