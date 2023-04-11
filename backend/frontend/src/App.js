import { useProSidebar } from "react-pro-sidebar";
import SideBar from "./components/SideBar";
import Header from './components/Header';
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import StovesScreen from "./screens/StovesScreen";


function App() {
  const { collapseSidebar } = useProSidebar();
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname)
  return (
    <Router>
      <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
        {currentLocation!=='/' && <SideBar />}
        <main className="main flex flex-col flex-grow">
          <Header currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
          <Routes>
          <Route path="/"  element={<LoginScreen  />} />
          <Route path="/stoves"  element={<StovesScreen  />} />
          </Routes>
          
        </main>
        
      </div>
    </Router>
  );
}

export default App;
