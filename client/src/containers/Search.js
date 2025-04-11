import React, { createContext, useContext, useState } from 'react';
import { getDishes } from '../queries';
import { Input, Button, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const Search = ({setCardRecipe, setShowModal}) => {
      const [search, setSearch] = useState('');
      const [recipes, setRecipes] = useState([]);

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
      };
    
      const showRecipeCard = (item) => {
        setCardRecipe(item)
        setShowModal(true)
      };

    return (

        <>
        <Input 
                  placeholder='Search Recipes...'
                  onChange={(e) => queryRecipes(e.target.value)}
                />
                <Button onSubmit={() => queryRecipes(search, true)}>
                  Find Recipe
                </Button>
                {recipes.length > 0 &&
                    <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: 'auto',
                      padding: '0 16px',
                      border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                  >
                    <InfiniteScroll
                      dataLength={recipes.length}
                      hasMore={recipes.length < 100}
                      scrollableTarget="scrollableDiv"
                    >
                    <List
                    bordered
                    dataSource={recipes}
                    renderItem={(item) => (
                      <div onClick={() => showRecipeCard(item)}>
                        <List.Item style={{cursor: 'pointer'}} onClick={() => showRecipeCard(item)}>
                          <List.Item.Meta
                            title={item.name}
                          />
                        </List.Item>
        
                      </div>
                    )}
                    />
                    </InfiniteScroll>
                  </div>
                }
        </>
    )
}

export default Search;