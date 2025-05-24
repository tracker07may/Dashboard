import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewNutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = '665e4fb01307d6f441234567'; // Replace with actual user ID if dynamic

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/api/nutrition/n/${userId}`);
        setNutritionData(response.data);
      } catch (err) {
        console.error(err);
        setError('⚠️ Error fetching nutrition data.');
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [userId]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Your Nutrition Records</h2>

        {loading ? (
          <p style={styles.message}>Loading...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: 'red' }}>{error}</p>
        ) : nutritionData.length === 0 ? (
          <p style={styles.message}>No records found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Food</th>
                <th style={styles.th}>Calories</th>
                <th style={styles.th}>Protein (g)</th>
                <th style={styles.th}>Carbs (g)</th>
                <th style={styles.th}>Fats (g)</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.foodName}</td>
                  <td style={styles.td}>{item.calories}</td>
                  <td style={styles.td}>{item.protein}</td>
                  <td style={styles.td}>{item.carbs}</td>
                  <td style={styles.td}>{item.fats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#000',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: 800,
    width: '100%',
    padding: 30,
    borderRadius: 20,
    background: '#1a1a1a',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 28,
    fontWeight: 700,
    color: '#2ecc71',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 20,
  },
  th: {
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    textAlign: 'left',
    borderBottom: '1px solid #444',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #333',
    color: '#ddd',
  },
  message: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 20,
    fontSize: 16,
  },
};

export default ViewNutrition;
