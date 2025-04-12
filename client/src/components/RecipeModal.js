import React, {useState, useEffect} from "react";
import { Row, Col, Input, Button, Alert, List, Modal, Table } from 'antd';


const RecipeModal = ({recipe, setShowModal, showModal, setSavedRecipes, savedRecipes, setRecipes, setSearch}) => {
    const [showAlert, setShowAlert] = useState(false)
    const modalTitle = `${recipe.name} Ingredients`
    const handleOk = () => {
      if (savedRecipes.length < 4) {
        setSavedRecipes(savedRecipes.concat(recipe))
        setShowModal(false);
        setRecipes([])
        setSearch('')
        const inputField = document.getElementById('search_input_field');
        inputField.value = ''

      } else {
        // setShowModal(false);
        setShowAlert(true)
      }
    };

    const handleCancel = () => {
        setShowModal(false);
        setShowAlert(false)
    };

    const columns = [
        {
          title: 'Ingredient',
          dataIndex: 'ingredient',
          key: 'ingredient',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Unit',
          dataIndex: 'unit',
          key: 'unit',
        }
      ];

      const ingredientsData = recipe.ingredients.map((ingredient) => {
        return {
            key : ingredient._id,
            ingredient: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unitOfMeasure
        }
      });

    return (
        <Modal 
            title={modalTitle}
            open={showModal}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                  Back
                </Button>,
                <Button onClick={handleOk}>
                  Add Recipe
                </Button>
              ]}
        >
            <Table 
                dataSource={ingredientsData} 
                columns={columns} 
                pagination={true}
                size="small" // Make the table compact
            />
        {showAlert &&
          <Alert message="Grocery lists can not exceed 4 dishes" type="error" />
        }
        </Modal>
    )
};

export default RecipeModal;
