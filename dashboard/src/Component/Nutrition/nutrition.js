import React, { useState } from 'react';
import axios from 'axios';

const NUTRITIONIX_APP_ID = '87bee410';
const NUTRITIONIX_API_KEY = '8b97cad7517a7997e43e8390fdcbd37a';

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

  const userId = '665e4fb01307d6f441234567';

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
        setMessage('✅ Nutrition data fetched!');
      } else {
        setMessage('⚠️ No data found for this food.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to fetch nutrition data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFoodNameBlur = () => {
    fetchNutritionData(formData.foodName.trim());
  };

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

      setMessage('✅ Nutrition data saved successfully!');
      setFormData({ foodName: '', calories: '', protein: '', carbs: '', fats: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving nutrition data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '50px auto',
      padding: 30,
      borderRadius: 20,
      border: '2px solid #28a745',
      background: '#000',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
    }}>
      <h2 style={{ textAlign: 'center', color: '#28a745' }}>🥗 Add Nutrition Data</h2>
      <form onSubmit={handleSubmit}>
        {['foodName', 'calories', 'protein', 'carbs', 'fats'].map((field, idx) => (
          <input
            key={idx}
            name={field}
            type={field === 'foodName' ? 'text' : 'number'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field !== 'foodName' ? ' (g)' : '')}
            value={formData[field]}
            onChange={handleChange}
            onBlur={field === 'foodName' ? handleFoodNameBlur : undefined}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 14px',
              marginBottom: 15,
              borderRadius: 10,
              border: '1px solid #28a745',
              fontSize: 16,
              backgroundColor: '#111',
              color: '#fff',
            }}
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: 16,
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {loading ? 'Saving...' : 'Add Nutrition'}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: '#111',
          borderRadius: 10,
          textAlign: 'center',
          color: message.includes('✅') ? '#28a745' : message.includes('❌') ? '#dc3545' : '#ffc107',
          fontWeight: 500,
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddNutritionForm;
