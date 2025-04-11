import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../AuthContext'
import { getDishes, getDishOnSubmit } from '../queries';
import { Input, Button, List } from 'antd';

// App component that requires authentication
const Home = () => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])

  const processRecipes = (recipes) => {
    return recipes
  };

  async function queryRecipes (value, isSubmit=false) {
    console.log('value', value)
    if (value.length == 0) {
      setSearch('')
      setRecipes([])
      return
    }
    let recipesResponse = await getDishes(value, isSubmit)
    recipesResponse = processRecipes(recipesResponse)
    setSearch(recipesResponse)
    setRecipes(recipesResponse)
  }

  const searchDishOnSubmit = () => {

  }
  
  return (
    <>
      <div>
        {/* <h1>Welcome to the App, {user.username}!</h1> */}
        <h2>Start a grocery list!</h2>
        <Input 
          placeholder='Search Recipes...'
          onChange={(e) => queryRecipes(e.target.value)}
        />
        <Button onSubmit={() => searchDishOnSubmit()}>
          Find Recipe
        </Button>
        {recipes.length > 0 &&
          <List
          // style={{height: '30px'}}
          bordered
          dataSource={recipes}
          renderItem={(item) => (
            <List.Item>
              {item.name}
            </List.Item>
          )}
          />
        }
      </div>

      {/* <div>
        <button onClick={logout}>Logout</button>
      </div> */}
    </>
  );
};

export default App;
