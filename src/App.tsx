import React from 'react';
import { List, PageHeader } from 'antd';
import styled from 'styled-components';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

const App = () => {
  return (
    <>
      <SMainDiv>
        <PageHeader title="Notes" />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </SMainDiv>
    </>
  );
};

export const SMainDiv = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
`;

export default App;
