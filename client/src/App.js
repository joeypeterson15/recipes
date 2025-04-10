import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'
import { getDishes, getDishOnSubmit } from './queries';
import { Input, Button, List } from 'antd';

// App component that requires authentication
const App = () => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])

  const processRecipes = (recipes) => {
    return recipes
  };

  const queryRecipes = (value, isSubmit=false) => {
    console.log('in query recipes')
    let recipesResponse = getDishes(value, isSubmit)
    recipesResponse = processRecipes(recipesResponse)
    setSearch(recipesResponse)
    setRecipes(recipesResponse)
  }

  const searchDishOnSubmit = () => {

  }
  
  return (
    <>
      <div>
        <h1>Welcome to the App, {user.username}!</h1>
        <Input 
          placeholder='Search Recipes...'
          onChange={(e) => queryRecipes(e.target.value)}
        />
        <Button onSubmit={() => searchDishOnSubmit()}>
          Find Recipe
        </Button>
        {recipes.length > 0 &&
          <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={recipes}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
          />
        }
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default App;
