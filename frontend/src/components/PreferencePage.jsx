import React, { useState } from 'react';
import { Button } from '@mui/material';
import Select from 'react-select';

const dietaryOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
];

const cuisineOptions = [
  { value: 'italian', label: 'Italian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'indian', label: 'Indian' },
  { value: 'mexican', label: 'Mexican' },
  // ... many more
];

const mealOptions = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

const cookingTimeOptions = [
  { value: '<15', label: 'Under 15 minutes' },
  { value: '15-30', label: '15-30 minutes' },
  { value: '30-60', label: '30-60 minutes' },
  { value: '>60', label: 'More than 60 minutes' },
];

const PreferencesPage = () => {
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);

  const handleFilterApply = () => {
    console.log(selectedDietary, selectedCuisine, selectedMeal, selectedTime);
  };

  return (
    <div>
      <h1>Preferences</h1>
      
      <Select 
        options={dietaryOptions} 
        isMulti 
        onChange={setSelectedDietary} 
        placeholder="Dietary Preferences..."
      />
      <Select 
        options={cuisineOptions} 
        isMulti 
        onChange={setSelectedCuisine} 
        placeholder="Cuisine Type..."
      />
      <Select 
        options={mealOptions} 
        onChange={setSelectedMeal} 
        placeholder="Meal Type..."
      />
      <Select 
        options={cookingTimeOptions} 
        onChange={setSelectedTime} 
        placeholder="Cooking Time..."
      />

      <Button onClick={handleFilterApply}>Apply Filters</Button>
    </div>
  );
};

export default PreferencesPage;
