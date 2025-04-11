import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Input, Button, List, Skeleton } from 'antd';
import RecipeModal from './RecipeModal';
import Search from '../containers/Search';

// App component that requires authentication
const Home = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [cardRecipe, setCardRecipe]= useState("");
  const [savedRecipes, setSavedRecipes] = useState([])
  
  return (
    <>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>Start a grocery list!</h2>
          <Button>View List</Button>
        </div>

        <Search setShowModal={setShowModal} setCardRecipe={setCardRecipe}/>

        {showModal && 
          <RecipeModal 
            recipe={cardRecipe}
            showModal={showModal}
            setShowModal={setShowModal}
            setSavedRecipes={setSavedRecipes}
            savedRecipes={savedRecipes}
          />
        }
      </div>

      {/* <div>
        <button onClick={logout}>Logout</button>
      </div> */}
    </>
  );
};

export default Home;
