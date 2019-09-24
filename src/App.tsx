import React, { useEffect, useState } from 'react';
import { PageHeader } from 'antd';
import styled from 'styled-components';
import NotesList from './components/NotesList';
import NotesService from './service';
import { Note } from './types';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      const notes = await NotesService.getNotes();
      setNotes(notes);
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <SMainDiv>
        <PageHeader title="Notes" />
        <NotesList
          notes={notes}
          onItemClick={() => console.log('test')}
          isLoading={isLoading}
          onAddClick={() => console.log('add')}
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
