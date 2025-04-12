import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Button, Typography } from "antd";
import { Layout, theme } from "antd";
import RecipeModal from "./RecipeModal";
import Search from "../containers/Search";
import SelectedDishesTable from "./SelectedRecipesList";
import GroceryListModal from "./GroceryListModal";
const { Content } = Layout;

const Home = () => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [cardRecipe, setCardRecipe]= useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logoutUser = () => {
    logout()
  }
  return (
    <Layout style={{
      height: "100vh", 
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      margin: 0,
      padding: 0
    }}>
      <Content style={{ padding: "0 48px", position: "relative"}}>
        <div
          style={{
            margin: "auto",
            marginTop: "50px",
            paddingTop: "20px",
            padding: 24,
            minHeight: "750px",
            width: "40%",
            alignItems: "center",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border: "0.2px solid black"
          }}
        >
        <div>
          <div style={{paddingTop: "20px", paddingBottom: "25px", display: "flex", justifyContent: "space-between"}}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              Start a Grocery List
          </Typography.Title>
          <Button 
            style={{marginTop: '10px'}}
            onClick={logoutUser}>
              Logout
            </Button>
          </div>

          <div style={{ position: "relative", paddingBottom: "20px" }}>
            <Search
              search={search}
              setSearch={setSearch}
              setShowModal={setShowModal} 
              setCardRecipe={setCardRecipe}
              recipes={recipes}
              setRecipes={setRecipes}
            />
            </div>
            <div style={{ marginTop: "60%", position: "relative", zIndex: 1 }}>
              <SelectedDishesTable
                savedRecipes={savedRecipes}
                setSavedRecipes={setSavedRecipes}
                setShowGroceryModal={setShowGroceryModal}
              />
            </div>
          {showModal && 
            <RecipeModal 
              recipe={cardRecipe}
              showModal={showModal}
              setShowModal={setShowModal}
              setSavedRecipes={setSavedRecipes}
              savedRecipes={savedRecipes}
              setRecipes={setRecipes}
              setSearch={setSearch}
            />
          }

          {showGroceryModal && 
            <GroceryListModal 
              savedRecipes={savedRecipes}
              showGroceryModal={showGroceryModal}
              setShowGroceryModal={setShowGroceryModal}
            />
          }
        </div>

        </div>
      </Content>
    </Layout>
  );
};

export default Home;
