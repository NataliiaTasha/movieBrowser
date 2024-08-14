import React from "react";
import { Route, Routes} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DiscoverScreen from "./pages/DiscoverScreen";
import DetailScreen from "./pages/DetailScreen";
import BottomNav from "./components/BottomNav";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/discover" element={<DiscoverScreen />}/>
        <Route path="/detail/:id" element={<DetailScreen />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;