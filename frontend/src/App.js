import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Transactions from "./pages/Transactions";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";

function App() {

  return (

    <>

      {/* TOAST NOTIFICATIONS */}

      <Toaster
        position="top-right"
        toastOptions={{

          duration: 4000,

          style: {

            background: "#111827",

            color: "#fff",

            border:
              "1px solid #374151"

          }

        }}
      />


      {/* ROUTES */}

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          <Route
            path="/dashboard"
            element={

              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>

            }
          />

          <Route
            path="/profile"
            element={<Profile />}
            />
            
          <Route
            path="/transactions"
            element={

              <ProtectedRoute>

                <Transactions />

              </ProtectedRoute>

            }
          />

        </Routes>

      </BrowserRouter>

    </>

  );

}

export default App;