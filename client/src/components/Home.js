import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../AuthContext";
import { Input, Button, List, Skeleton, Typography } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import RecipeModal from "./RecipeModal";
import Search from "../containers/Search";
import SelectedDishesTable from "./SelectedRecipesList";
import GroceryListModal from "./GroceryListModal";
const { Header, Content, Footer } = Layout;

// App component that requires authentication
const navNames = ["Search Recipes", "View List"];
const items = navNames.map((name, index) => ({
  key: String(index + 1),
  label: name,
}));

const Home = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [cardRecipe, setCardRecipe]= useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  
const {
  token: { colorBgContainer, borderRadiusLG },
} = theme.useToken();
return (
  <Layout style={{height: "100%", position: "relative"}}>
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
    <Footer style={{ textAlign: "center" }}>
    </Footer>
  </Layout>
);
};

export default Home;
