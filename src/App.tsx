import { Navigate, Route, Routes } from "react-router-dom";
import PollList from "./pages/PollList/PollList";
import PollPage from "./pages/PollPage/PollPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import CreatePoll from "./pages/CreatePoll/CreatePoll";
import SharePoll from "./pages/SharePoll/SharePoll";
import NavBar from "./components/NavBar";
import EditPoll from "./pages/EditPoll/EditPoll";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PollList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePoll />
              </PrivateRoute>
            }
          />
          <Route
            path="/polls/:id/share"
            element={
              <PrivateRoute>
                <SharePoll />
              </PrivateRoute>
            }
          />
          <Route path="/poll/:id" element={<PollPage />} />
          <Route path="/poll/:id/edit" element={<EditPoll />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
