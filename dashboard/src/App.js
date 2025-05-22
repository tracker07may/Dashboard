import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AddWorkout from "./Component/workout/Addworkout";
import ViewWorkout from "./Component/workout/Viewworkout";
import ViewSetCounter from "./Component/setcounter/ViewSetCounter";
import AddSetCounter from "./Component/setcounter/AddSetCounter";




function App() {
  return (
   <Router>
      <div className="container mt-4">
        {/* <h1 className="text-center mb-4">Fitness Tracker</h1> */}
        <Routes>
          <Route path="/work" element={<AddWorkout />} />
          <Route path="/view" element={<ViewWorkout />} />
          <Route path="/set" element={<AddSetCounter />} />
          <Route path="/viewset" element={<ViewSetCounter />} />

          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
