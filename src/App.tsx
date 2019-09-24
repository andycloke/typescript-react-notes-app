import React, { useEffect, useState } from 'react';
import { PageHeader, Button } from 'antd';
import styled from 'styled-components';
import NotesList from './components/NotesList';
import NotesService from './service';
import { Note, NoteStatus } from './types';
import NoteModal, { FormValues } from './components/NoteModal';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addModalIsShowing, setAddModalIsShowing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    setIsLoading(true);
    const notes = await NotesService.getNotes();
    setNotes(notes);
    setIsLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleAddModalSaveClick = async (values: FormValues) => {
    const newNote = await NotesService.postNote(values);
    setNotes(notes => Array.from(new Set([...notes, newNote])));
    setAddModalIsShowing(false);
  };

  const handleAddNoteClick = () => setAddModalIsShowing(true);

  return (
    <SOuterDiv>
      <PageHeader
        title="Notes"
        extra={
          <Button type="primary" onClick={handleAddNoteClick}>
            Add Note
          </Button>
        }
      />
      <SListDiv>
        <NotesList
          notes={notes}
          onItemClick={() => console.log('test')}
          isLoading={isLoading}
          onAddClick={handleAddNoteClick}
        />
        <NoteModal
          isOpen={addModalIsShowing}
          onSaveClick={handleAddModalSaveClick}
          onCancelClick={() => setAddModalIsShowing(false)}
          initialValues={{ text: '', status: NoteStatus.DRAFT }}
        />
      </SListDiv>
    </SOuterDiv>
  );
};

export const SOuterDiv = styled.div`
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
`;

export const SListDiv = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

export default App;
