import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewSetCounter = () => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const fetchSetCounters = async () => {
      try {
        const res = await axios.get("http://localhost:3009/api/setcounter");
        setSets(res.data);
      } catch (error) {
        alert("❌ Error fetching sets: " + error.message);
      }
    };
    fetchSetCounters();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded-4 p-4 bg-dark text-white">
        <h2 className="text-center mb-4">📋 Set Counter History</h2>
        {sets.length === 0 ? (
          <p className="text-center">No Set Counters Added Yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-white">
              <thead className="table-light text-dark">
                <tr>
                  <th>Exercise</th>
                  <th>Set Count</th>
                  <th>Notes</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {sets.map((set) => (
                  <tr key={set._id}>
                    <td>{set.workoutName}</td>
                    <td>{set.totalSets}</td>
                    <td>{set.notes || "—"}</td>
                    <td>{new Date(set.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSetCounter;
