import Resource from './resource/Resource'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
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


  const Layout = ({children}) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    }
  
    return children;
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Layout>
            <Resource />
          </Layout>
        </ProtectedRoute>
      ),
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