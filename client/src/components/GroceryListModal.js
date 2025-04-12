import React from "react";
import { Button, Modal, Table } from "antd";
import { recipes2GroceryList } from "../utils";

const GroceryListModal = ({savedRecipes, showGroceryModal, setShowGroceryModal}) => {

    const modalTitle = "Grocery List";
    const groceryList = recipes2GroceryList(savedRecipes);
  
    const handleCancel = () => {
        setShowGroceryModal(false);
    };

    const columns = [
        {
          title: "Ingredient",
          dataIndex: "ingredient",
          key: "ingredient",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Unit",
          dataIndex: "unit",
          key: "unit",
        }
      ];

    return (
    <Modal 
        title={modalTitle}
        open={showGroceryModal}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
                Back
            </Button>,
            ]}
    >
        <Table 
            dataSource={groceryList} 
            columns={columns} 
            pagination={true}
            size="small"
        />
    </Modal>
    );
};

export default GroceryListModal;