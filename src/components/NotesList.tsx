import React from 'react';
import { List, Button, Typography } from 'antd';
import { Note, NoteStatus } from '../types';

interface IProps {
  notes: Note[];
  isLoading: boolean;
  onAddClick: () => void;
  onEditItemClick: (id: string) => void;
  onDeleteItemClick: (id: string) => void;
}

const NotesList = ({
  notes,
  isLoading,
  onAddClick,
  onEditItemClick,
  onDeleteItemClick
}: IProps) => {
  const locale = {
    emptyText: (
      <>
        <Typography.Paragraph>You don't have any notes yet</Typography.Paragraph>
        <Button type="primary" onClick={onAddClick}>
          Add your first note
        </Button>
      </>
    )
  };

  return (
    <List
      bordered
      loading={isLoading}
      locale={locale}
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={note => (
        <List.Item
          actions={[
            <a onClick={() => onEditItemClick(note.id)}>edit</a>,
            <a onClick={() => onDeleteItemClick(note.id)}>delete</a>
          ]}
        >
          <List.Item.Meta
            title={note.text}
            description={note.status === NoteStatus.PUBLISHED ? 'Published' : 'Draft'}
          />
        </List.Item>
      )}
    />
  );
};

export default NotesList;
