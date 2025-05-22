import React, { useState } from 'react';
import axios from 'axios';

const NUTRITIONIX_APP_ID = '87bee410';  // Replace with your Nutritionix App ID
const NUTRITIONIX_API_KEY = '8b97cad7517a7997e43e8390fdcbd37a'; // Replace with your Nutritionix API Key

const AddNutritionForm = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const userId = '665e4fb01307d6f441234567'; // Replace with actual user ID

  // Fetch nutrition data from Nutritionix API by foodName
  const fetchNutritionData = async (foodName) => {
    if (!foodName) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: foodName },
        {
          headers: {
            'x-app-id': NUTRITIONIX_APP_ID,
            'x-app-key': NUTRITIONIX_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.foods && res.data.foods.length > 0) {
        const food = res.data.foods[0];
        setFormData({
          foodName: food.food_name,
          calories: food.nf_calories || '',
          protein: food.nf_protein || '',
          carbs: food.nf_total_carbohydrate || '',
          fats: food.nf_total_fat || '',
        });
        setMessage('Nutrition data fetched automatically!');
      } else {
        setMessage('No nutrition data found for this food.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch nutrition data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes (including foodName)
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // On foodName input blur, fetch nutrition info
  const handleFoodNameBlur = () => {
    fetchNutritionData(formData.foodName.trim());
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:3009/api/nutrition/n', {
        ...formData,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbs: Number(formData.carbs),
        fats: Number(formData.fats),
        userId,
      });

      setMessage('Nutrition data saved successfully!');
      setFormData({ foodName: '', calories: '', protein: '', carbs: '', fats: '' });
    } catch (err) {
      console.error(err);
      setMessage('Error saving nutrition data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Add Nutrition Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          onBlur={handleFoodNameBlur}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />

        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />
        <input
          name="protein"
          type="number"
          placeholder="Protein (g)"
          value={formData.protein}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />
        <input
          name="carbs"
          type="number"
          placeholder="Carbs (g)"
          value={formData.carbs}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />
        <input
          name="fats"
          type="number"
          placeholder="Fats (g)"
          value={formData.fats}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Saving...' : 'Add Nutrition'}
        </button>
      </form>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
};

export default AddNutritionForm;
