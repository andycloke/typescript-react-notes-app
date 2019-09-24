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
  const [editModalNoteId, setEditModalNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      const notes = await NotesService.getNotes();
      setNotes(notes);
      setIsLoading(false);
    };
    getNotes();
  }, []);

  const handleAddModalSaveClick = async (values: FormValues) => {
    const newNote = await NotesService.postNote(values);
    setNotes(notes => Array.from(new Set([...notes, newNote])));
    setAddModalIsShowing(false);
  };

  const handleEditModalSaveClick = async (values: FormValues) => {
    if (editModalNoteId) {
      const updatedNote = await NotesService.patchNote(editModalNoteId, values);
      setNotes(notes => Array.from(new Set([...notes, updatedNote])));
      setEditModalNoteId(null);
    }
  };

  const handleAddNoteClick = () => setAddModalIsShowing(true);

  const editModalNote = notes.find(note => note.id === editModalNoteId);

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
          onItemClick={setEditModalNoteId}
          isLoading={isLoading}
          onAddClick={handleAddNoteClick}
        />
        <NoteModal
          isOpen={addModalIsShowing}
          onSaveClick={handleAddModalSaveClick}
          onCancelClick={() => setAddModalIsShowing(false)}
          initialValues={{ text: '', status: NoteStatus.DRAFT }}
        />
        {editModalNote && (
          <NoteModal
            isOpen={!!editModalNoteId}
            onSaveClick={handleEditModalSaveClick}
            onCancelClick={() => setEditModalNoteId(null)}
            initialValues={editModalNote}
          />
        )}
      </SListDiv>
    </SOuterDiv>
  );
};

export const SOuterDiv = styled.div`
  max-width: 1050px;
  width: 90%;
  margin: 0 auto;
`;

export const SListDiv = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

export default App;
