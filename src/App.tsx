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
    setNotes(notes => [...notes, newNote]);
    setAddModalIsShowing(false);
  };

  const hanldeAddModalCloseClick = () => setAddModalIsShowing(false);

  const handleEditModalSaveClick = async (values: FormValues) => {
    if (editModalNoteId) {
      const updatedNote = await NotesService.patchNote(editModalNoteId, values);
      setNotes(notes => notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
      setEditModalNoteId(null);
    }
  };

  const hanldeEditModalCloseClick = () => setEditModalNoteId(null);

  const handleAddNoteClick = () => setAddModalIsShowing(true);

  const handleDeleteNoteClick = async (id: string) => {
    await NotesService.deleteNote(id);
    setNotes(notes => notes.filter(note => note.id !== id));
  };

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
          onEditItemClick={setEditModalNoteId}
          onDeleteItemClick={handleDeleteNoteClick}
          isLoading={isLoading}
          onAddClick={handleAddNoteClick}
        />
        <NoteModal
          isOpen={addModalIsShowing}
          onSaveClick={handleAddModalSaveClick}
          onCancelClick={hanldeAddModalCloseClick}
          initialValues={{ text: '', status: NoteStatus.DRAFT }}
        />
        {editModalNote && (
          <NoteModal
            isOpen={!!editModalNoteId}
            onSaveClick={handleEditModalSaveClick}
            onCancelClick={hanldeEditModalCloseClick}
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
