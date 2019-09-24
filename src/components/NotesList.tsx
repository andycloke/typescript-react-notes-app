import React from 'react';
import { List, Button, Typography } from 'antd';
import { Note } from '../types';

interface IProps {
  notes: Note[];
  isLoading: boolean;
  onAddClick: () => void;
  onItemClick: (id: string) => void;
}

const NotesList = ({ notes, isLoading, onAddClick, onItemClick }: IProps) => {
  return (
    <List
      bordered
      loading={isLoading}
      locale={{
        emptyText: (
          <>
            <Typography.Paragraph>You don't have any notes yet</Typography.Paragraph>
            <Button type="primary" onClick={onAddClick}>
              Add your first note
            </Button>
          </>
        )
      }}
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={note => (
        <List.Item onClick={() => onItemClick(note.id)}>
          <List.Item.Meta title={note.text} />
        </List.Item>
      )}
    />
  );
};

export default NotesList;
