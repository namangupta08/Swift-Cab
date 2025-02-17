import { Route, Routes } from "react-router-dom";

import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import Home from "./pages/Home.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import UserLogout from "./pages/UserLogout.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        
        <Route path="/login" element={<UserLogin />} />
        
        <Route path="/signup" element={<UserSignup />} />
        
        <Route path="/captain-login" element={<CaptainLogin />} />
        
        <Route path="/captain-signup" element={<CaptainSignup />} />
        
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />

        <Route path="/user/logout" element={<UserLogout/>} />
      </Routes>
    </div>
  );
};

export default App;
