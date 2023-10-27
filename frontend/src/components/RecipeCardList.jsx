import React, { useState, useEffect } from "react";
import LikedRecipe from "./LikedRecipe";

// const mockData = [
//   {
//     id: 1,
//     imgSrc: "/mushroomPasta.png",
//     name: "Mushroom Pasta",
//     description: "Delicious mushroom pasta with creamy sauce.",
//   },
// {
//   id: 2,
//   imgSrc: "/ButterChicken.png",
//   name: "Butter Chicken",
//   description: "Delicious butter chicken with creamy sauce.",
// },
// {
//   id: 3,
//   imgSrc: "/BuddhaBowl.png",
//   name: "Buddha Bowl",
//   description: "Delicious buddha bowl with creamy sauce.",
// }
// Add more recipe objects as needed
//];

// const RecipeCardList = (props) => {


//   return (
//     <div>
//       {
//         mockData.map(recipe => (
//           <LikedRecipe {...recipe} key={recipe.id} />))
//       }
//     </div>
//   );
// };

const RecipeCardList = (props) => {
  const [apiData, setApiData] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   fetch(`/api/liked-recipes`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Received data from API:", data);

  //       setApiData(data);
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // }, []); // Empty dependency array ensures it only runs once on mount

  //   return (
  //     <div>
  //       {apiData.map(recipe => (

  //         <LikedRecipe title={recipe.title} description={recipe.description} key={recipe.id} apiData={apiData} />
  //       ))}
  //     </div>
  //   );
};

export default RecipeCardList;





