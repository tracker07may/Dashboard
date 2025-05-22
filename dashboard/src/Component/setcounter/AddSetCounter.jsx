import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSetCounter = () => {
  const [formData, setFormData] = useState({
    workoutName: "",
    totalSets: "",
    completedSets: "",
    notes: "",
  });

  const workoutRef = useRef(null); // 👈 for autofocus
  const navigate = useNavigate(); // 👈 for redirect

  useEffect(() => {
    if (workoutRef.current) {
      workoutRef.current.focus(); // 🎯 auto-focus
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3009/api/setcounter/add", formData);

      Swal.fire({
        icon: "success",
        title: "Set Added!",
        text: "✅ Your set counter has been saved successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({
        workoutName: "",
        totalSets: "",
        completedSets: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/viewset"); // 🚀 redirect after 1.5s
      }, 1600);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "❌ " + (error.response?.data?.message || error.message),
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4 bg-dark text-white">
        <h2 className="text-center mb-4">💪 Add Set Counter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Exercise Name</label>
            <input
              type="text"
              name="workoutName"
              value={formData.workoutName}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Bench Press"
              ref={workoutRef}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Sets</label>
            <input
              type="number"
              name="totalSets"
              value={formData.totalSets}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., 4"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Completed Sets</label>
            <input
              type="number"
              name="completedSets"
              value={formData.completedSets}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., 3"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notes (optional)</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Reduce rest time next set"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            ➕ Add Set
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSetCounter;
