import React from "react";
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DiscoverScreen from "./pages/DiscoverScreen";
import DetailScreen from "./pages/DetailScreen";
import AccountScreen from "./pages/AccountScreen";
import BottomNav from "./components/BottomNav";
import './App.css';

function App() {
  return (
    <Router>
<div className="app-container">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/discover" element={<DiscoverScreen />}/>
        <Route path="/detail/:id" element={<DetailScreen />} />
        <Route path="/account" element={<AccountScreen />} />
      </Routes>
      <BottomNav />
    </div>
    </Router>
    
  );
}

export default App;
