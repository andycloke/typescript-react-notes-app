import React, { useEffect, useState } from 'react';
import { PageHeader, Button } from 'antd';
import styled from 'styled-components';
import NotesList from './components/NotesList';
import NotesService from './service';
import { Note, NoteStatus } from './types';
import NoteModal, { FormValues } from './components/NoteModal';

const EMPTY_NOTE_VALUES: FormValues = { text: '', status: NoteStatus.DRAFT };

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addModalIsShowing, setAddModalIsShowing] = useState(false);
  const [editModalNoteId, setEditModalNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        const notes = await NotesService.getNotes();
        setNotes(notes);
        setIsLoading(false);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    getNotes();
  }, []);

  const handleAddNoteClick = () => setAddModalIsShowing(true);

  const handleAddModalSaveClick = async (values: FormValues) => {
    const newNote = await NotesService.postNote(values);
    setNotes(notes => [...notes, newNote]);
    setAddModalIsShowing(false);
  };

  const handleAddModalCloseClick = () => setAddModalIsShowing(false);

  const handleEditModalSaveClick = async (values: FormValues) => {
    if (editModalNoteId) {
      const updatedNote = await NotesService.patchNote(editModalNoteId, values);
      setNotes(notes => notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
      setEditModalNoteId(null);
    }
  };

  const handleEditModalCloseClick = () => setEditModalNoteId(null);

  const handleEditNoteClick = async (id: string) => {
    setEditModalNoteId(id);
  };

  const handleDeleteNoteClick = async (id: string) => {
    try {
      await NotesService.deleteNote(id);
      setNotes(notes => notes.filter(note => note.id !== id));
    } catch (error) {
      console.log('error: ', error);
    }
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
          onEditItemClick={handleEditNoteClick}
          onDeleteItemClick={handleDeleteNoteClick}
          isLoading={isLoading}
          onAddClick={handleAddNoteClick}
        />
        <NoteModal
          isOpen={addModalIsShowing}
          onSaveClick={handleAddModalSaveClick}
          onCancelClick={handleAddModalCloseClick}
          initialValues={EMPTY_NOTE_VALUES}
        />
        <NoteModal
          isOpen={!!editModalNoteId}
          onSaveClick={handleEditModalSaveClick}
          onCancelClick={handleEditModalCloseClick}
          initialValues={editModalNote ? editModalNote : EMPTY_NOTE_VALUES}
        />
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
