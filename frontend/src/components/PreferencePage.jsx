// PreferencesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckboxGroup from './checkbox';
import NavigationBar from './NavigationBar';
import "../styles/PreferencePage.scss"

const initialPreferences = {
  dietary: [],
  allergens: [],
  cuisines: [],
  cookingMethods: [],
  ingredients: [],
  mealTypes: [],
};

const allOptions = {
  dietary: [
    'Vegan', 'Ketogenic', 'Paleolithic', 'Vegetarian', 'Pescatarian', 'Gluten-Free', 
    'Dairy-Free', 'Low-Carb', 'Low-Fat', 'High-Protein', 'Diabetic-Friendly', 
    'Halal', 'Kosher', 'Whole30', 'Autoimmune Protocol',
  ],
  allergens: [
    'Tree Nuts', 'Peanuts', 'Dairy', 'Eggs', 'Wheat', 'Soy', 'Fish', 
    'Shellfish', 'Sesame Seeds', 'Mustard', 'Celery', 'Sulfites', 
    'Lupin', 'Molluscs', 'Crustaceans',
  ],
  cuisines: [
    'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 
    'French', 'Mediterranean', 'Greek', 'Spanish', 'Korean', 
    'Vietnamese', 'Turkish', 'Ethiopian', 'Lebanese',
  ],
  cookingMethods: [
    'Grilling', 'Baking', 'Sautéing', 'Boiling', 'Steaming', 'Frying', 
    'Roasting', 'Slow Cooking', 'Microwaving', 'Broiling', 'Blanching', 
    'Poaching', 'Stir-Frying', 'Braising', 'Sous Vide',
  ],
  ingredients: [
    'Chicken', 'Beef', 'Pork', 'Fish', 'Lamb', 'Tofu', 'Tempeh', 'Beans', 
    'Lentils', 'Rice', 'Pasta', 'Cheese', 'Eggs', 'Tomatoes', 'Bell Peppers',
  ],
  mealTypes: [
    'Breakfast', 'Brunch', 'Lunch', 'Tea', 'Dinner', 'Supper', 'Snack', 
    'Dessert', 'Appetizer', 'Main Course', 'Side Dish', 'Salad', 'Soup', 
    'Beverage', 'Smoothie',
  ],
}

const user = {
  id: '15', // Ideally this should come from a context or parent component
};

const API_ENDPOINT = `/api/users/${user.id}/preferences`;

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        if (response.data && typeof response.data === 'object' && 'dietary' in response.data) {
          // If the structure of response.data is correct
          
          setPreferences(response.data);
          
        } else {
          // If response.data is null or doesn't have the expected structure
          console.error('Invalid or null data structure received:', response.data);
          setPreferences(initialPreferences);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setPreferences(initialPreferences); // Fallback to initial preferences in case of error
      }
    };
  
    fetchPreferences();
  }, []);

  const handlePreferenceChange = (category, value, isChecked) => {
    setPreferences((prevPreferences) => {
      const existingPrefs = Array.isArray(prevPreferences[category]) ? prevPreferences[category] : [];
      return {
        ...prevPreferences,
        [category]: isChecked
          ? [...existingPrefs, value]
          : existingPrefs.filter((pref) => pref !== value),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINT, { preferences });
      if (response.status === 200) {
        console.log('Preferences saved successfully!');
        navigate('/'); // Navigate to the home page
      } else {
        console.error('Failed to save preferences:', response);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <>
    <NavigationBar />
    <form onSubmit={handleSubmit} className="fixed-checkbox">
      {Object.entries(allOptions).map(([category, options]) => {
        const selectedOptions = preferences[category];
        // Ensure selectedOptions is an array before rendering CheckboxGroup
        return (
          
          <fieldset key={category}>
            <legend>{category}</legend>
            {Array.isArray(selectedOptions) ? (
              <CheckboxGroup
               className="fixed-checkbox"
                options={options}
                selectedOptions={selectedOptions}
                onChange={handlePreferenceChange}
                category={category}
                
              />
            ) : (
              <p>Loading preferences...</p> // or some error message if needed
            )}
          </fieldset>
        );
      })}
      <button type="submit">Save Preferences</button>
    </form>
    </>
  );
};

export default PreferencesPage;
