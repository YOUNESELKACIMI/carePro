import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import AuthorizationProvider from "./providers/AuthorizationProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthorizationProvider>
        <App />
      </AuthorizationProvider>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
