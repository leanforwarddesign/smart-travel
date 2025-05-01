import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your screens/components
import { HomepageTablet } from "./components/screens/homepage_mockup/HomepageTablet";
// Import other screens/components you want to show

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomepageTablet />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;