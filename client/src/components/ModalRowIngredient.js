import React from "react";
import { Badge, Descriptions } from 'antd';
import { Col, Divider, Row, Table } from 'antd';

const ModalRowIngredient = ({ingredient}) => {

    const style = { background: '#0092ff', padding: '0px 0' };
    const ingredientsData = [
        {
          key: '1',
          ingredient: 'Flour',
          quantity: 2,
          unit: 'cups'
        },
        {
          key: '2',
          ingredient: 'Sugar',
          quantity: 1,
          unit: 'cup'
        },
        {
          key: '3',
          ingredient: 'Baking Powder',
          quantity: 1.5,
          unit: 'tsp'
        },
        {
          key: '4',
          ingredient: 'Salt',
          quantity: 0.5,
          unit: 'tsp'
        },
        {
          key: '5',
          ingredient: 'Milk',
          quantity: 1,
          unit: 'cup'
        }
      ];

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

    return (
        // <Descriptions title="User Info" bordered items={items} />
        <>
            {/* <Row>
                <Col span={8}>{ingredient.name}</Col>
                <Col span={8}>{ingredient.quantity}</Col>
                <Col span={8}>{ingredient.unit}</Col>
            </Row> */}
                    <Table 
          dataSource={ingredientsData} 
        //   columns={columns} 
          pagination={false} // Remove pagination for a small list
          size="small" // Make the table compact
        />
        </>
    )
};

export default ModalRowIngredient;