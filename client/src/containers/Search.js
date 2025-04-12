import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { getDishes } from '../queries';
import { Input, Button, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Search.css'

const Search = ({setCardRecipe, setShowModal, setRecipes, recipes, search, setSearch}) => {

      // function useComponentVisible(initialIsVisible) {
      //   const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
      //   const ref = useRef(null);
    
      //   const handleClickOutside = (event) => {
      //       if (ref.current && !ref.current.contains(event.target)) {
      //           setIsComponentVisible(false);
      //           setRecipes([])
      //           setSearch('')
      //       }
      //   };
    
      //   useEffect(() => {
      //       document.addEventListener('click', handleClickOutside, true);
      //       return () => {
      //           document.removeEventListener('click', handleClickOutside, true);
      //       };
      //   }, []);
    
      //   return { ref, isComponentVisible, setIsComponentVisible };
      // }
      // const { ref, isComponentVisible } = useComponentVisible(true);
    
      async function searchRecipes(value, isSubmit=false) {
        if (value.length == 0) {
          setSearch('')
          setRecipes([])
          return
        }
        setSearch(value)
        const recipesResponse = await getDishes(search, isSubmit)
        setRecipes(recipesResponse)
      };

      async function searchRecipeSubmit(search, isSubmit=true) {
        if (search.length == 0) {
          setSearch('')
          setRecipes([])
          return
        }
        setSearch(search)
        const recipesResponse = await getDishes(search, isSubmit)
        if (recipesResponse.length == 1) {
          showRecipeCard(recipesResponse[0])
        }
      }

      const handleFocus = () => {
        console.log('in focus handler')
        setSearch('')
        setRecipes([])
      }

      const showRecipeCard = (item) => {
        setCardRecipe(item)
        setShowModal(true)
      };

    return (
        <>
            <Input
              id="search_input_field" 
              placeholder='Search Recipes...'
              onChange={(e) => searchRecipes(e.target.value)}
              onFocusOut={() => handleFocus()}
            />
          <Button 
              style={{float: 'right', marginTop: '20px' }}
              onClick={() => searchRecipeSubmit(search)}
              type='primary'
            >
              Search
            </Button>
            
            {/* <div ref={ref}> */}
              {/* {recipes?.length > 0 && isComponentVisible && */}
              {recipes?.length > 0 &&
                <div
                  id="scrollableDiv"
                  style={{
                    height: 300,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    zIndex: 1000,
                    position: 'absolute', // Changed from 'relative' to 'absolute'
                    width: '85%', // Make sure it has width
                    left: '50%', // Position at 50% from the left edge of the parent
                    left: 0, // Align with the left edge of the container
                    background: 'white', // Add background to prevent see-through
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: add shadow for better visibility
                  }}
                >
                  <InfiniteScroll
                    dataLength={recipes.length}
                    hasMore={recipes.length < 100}
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                    // bordered
                    dataSource={recipes}
                    renderItem={(item) => (
                      <div onClick={() => showRecipeCard(item)}>
                        <List.Item
                          className="hover-highlight"
                          style={{cursor: 'pointer'}} 
                          onClick={() => showRecipeCard(item)}
                        >
                          <List.Item.Meta style={{paddingLeft: '10px'}}
                            title={item.name}
                          />
                        </List.Item>
        
                      </div>
                    )}
                    />
                  </InfiniteScroll>
                </div>
              }

            {/* </div> */}
        </>
    )
}

export default Search;