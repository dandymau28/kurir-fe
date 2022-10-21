import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import checkAuth from "./helper/checkAuth";
import Shipment from "./pages/Shipment";
import Courier from "./pages/Courier";
import EditCourier from "./pages/EditCourier";
import AddCourier from "./pages/AddCourier";
import { LoginProvider } from "./context/LoginContext";
import AddShipment from "./pages/AddShipment";

const ProtectedRoute = ({ children }) => {
    let isLoggedIn = checkAuth();

    if (!isLoggedIn) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <LoginProvider value={checkAuth()}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/shipment">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Shipment />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="add"
                        element={
                            <ProtectedRoute>
                                <AddShipment />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/courier">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Courier />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="add"
                        element={
                            <ProtectedRoute>
                                <AddCourier />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path=":user_id/edit"
                        element={
                            <ProtectedRoute>
                                <EditCourier />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<h1>NotFound</h1>} />
            </Routes>
        </LoginProvider>
    );
}

export default App;
