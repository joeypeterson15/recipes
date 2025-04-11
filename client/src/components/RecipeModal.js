import React, {useState, useEffect} from "react";
import { Row, Col, Input, Button, List, Modal, Table } from 'antd';
import ModalRowIngredient from "./ModalRowIngredient";


const RecipeModal = ({recipe, setShowModal, showModal, setSavedRecipes, savedRecipes}) => {
    console.log('item:', recipe)
    const modalTitle = `${recipe.name} Ingredients`
    const handleOk = () => {
        setSavedRecipes(savedRecipes.concat(recipe))
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
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

      console.log('ingredientsData', ingredientsData)

    return (
        <Modal 
            title={modalTitle}
            open={showModal}
            onCancel={handleCancel}
            // onOk={handleOk} onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                  Back
                </Button>,
                // You can add additional buttons if needed
                <Button onClick={handleOk}>
                  Add Recipe
                </Button>
              ]}
        >
            <Table 
                dataSource={ingredientsData} 
                columns={columns} 
                pagination={true} // Remove pagination for a small list
                size="small" // Make the table compact
            />
        </Modal>
    )
};

export default RecipeModal;
