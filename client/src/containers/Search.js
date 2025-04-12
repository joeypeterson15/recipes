import React from "react";
import { getDishes } from "../queries";
import { Input, Button, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Search.css";

const Search = ({setCardRecipe, setShowModal, setRecipes, recipes, search, setSearch}) => {
    
      async function searchRecipes(value, isSubmit=false) {
        if (value.length === 0) {
          setSearch("");
          setRecipes([]);
          return;
        }
        setSearch(value);
        const recipesResponse = await getDishes(search, isSubmit);
        setRecipes(recipesResponse);
      }

      async function searchRecipeSubmit(search, isSubmit=true) {
        if (search.length === 0) {
          setSearch("");
          setRecipes([]);
          return;
        }
        setSearch(search);
        const recipesResponse = await getDishes(search, isSubmit);
        if (recipesResponse.length === 1) {
          showRecipeCard(recipesResponse[0]);
        }
      }

      const showRecipeCard = (item) => {
        setCardRecipe(item);
        setShowModal(true);
      };

    return (
        <>
          <Input
            id="search_input_field" 
            placeholder='Search Recipes...'
            onChange={(e) => searchRecipes(e.target.value)}
          />
            <Button 
              style={{float: "right", marginTop: "20px" }}
              onClick={() => searchRecipeSubmit(search)}
              type='primary'
            >
              Search
            </Button>
              {recipes?.length > 0 &&
                <div
                  id="scrollableDiv"
                  style={{
                    height: 300,
                    overflow: "auto",
                    padding: "0 16px",
                    border: "1px solid rgba(140, 140, 140, 0.35)",
                    zIndex: 1000,
                    position: "absolute",
                    width: "85%",
                    left: "50%",
                    background: "white",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }}
                >
                  <InfiniteScroll
                    dataLength={recipes.length}
                    hasMore={recipes.length < 100}
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                    dataSource={recipes}
                    renderItem={(item) => (
                      <div onClick={() => showRecipeCard(item)}>
                        <List.Item
                          className="hover-highlight"
                          style={{cursor: "pointer"}} 
                          onClick={() => showRecipeCard(item)}
                        >
                          <List.Item.Meta style={{paddingLeft: "10px"}}
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
    );
};

export default Search;