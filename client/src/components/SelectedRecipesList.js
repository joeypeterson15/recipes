import React, {useEffect, useState} from "react";
import { Badge, Descriptions } from 'antd';
import { Col, Divider, Row, Table, List, Typography, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const SelectedDishesTable = ({ savedRecipes, setSavedRecipes, setShowGroceryModal }) => {
  const [displayData, setDisplayData] = useState([])

  useEffect(() => {
    setDisplayData(() => {
      return savedRecipes.map((recipe) => recipe.name)
    })
  }, [savedRecipes])
  function showGroceryModal() {
    setShowGroceryModal(true)
  }

  const removeSavedRecipe = (item) => {
    setSavedRecipes(() => {
      return savedRecipes.filter((recipe) => recipe.name != item)

      }
    )
  }
  
  const header = <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Typography.Title level={4}>Saved Dishes</Typography.Title>
    <Button
      style={{marginTop: '20px'}}
      onClick={() => showGroceryModal()}
      type="primary">
        View List
    </Button>
  </div>

  const recipeItem = (item) => {
    return <div style={{display: 'flex', justifyContent: 'space-between' }}>
      <List.Item>{item}</List.Item>
      <MinusCircleOutlined style={{marginRight: '25px', cursor: 'pointer'}} onClick={() => removeSavedRecipe(item)} />
    </div>
  };

    return (
          <List
            size="small"
            header={header}
            bordered
            dataSource={displayData}
            renderItem={item =>recipeItem(item)}
          />
    )
};

export default SelectedDishesTable;