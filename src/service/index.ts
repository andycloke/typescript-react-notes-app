import { Note, NotePostRequest, NotePatchRequest, NoteResponse, NotesResponse } from '../types';

class NoteService {
  notes: Note[] = [];

  getNotes = async (): Promise<NotesResponse> => {
    return this.notes;
  };

  getNote = async (id: string): Promise<NoteResponse> => {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      return note;
    } else {
      throw new Error(`Note with id: ${id} 'does not exist`);
    }
  };

  postNote = async (body: NotePostRequest) => {
    const newNote: Note = {
      id: Math.round(Math.random() * 100000).toString(),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      ...body
    };
    this.notes.push(newNote);
    return newNote;
  };

  patchNote = async (id: string, body: NotePatchRequest) => {
    const existingNote = this.notes.find(note => note.id === id);
    if (existingNote) {
      const updatedNote: Note = {
        ...existingNote,
        ...body
      };
      this.notes = this.notes.map(note => (note.id === id ? updatedNote : note));
      return existingNote;
    } else {
      throw new Error(`Note with id: ${id} 'does not exist`);
    }
  };

  deleteNote = (id: string) => {
    const existingNote = this.notes.find(note => note.id === id);
    if (existingNote) {
      this.notes = this.notes.filter(note => note.id !== id);
    } else {
      throw new Error(`Note with id: ${id} 'does not exist`);
    }
  };
}

const Service = new NoteService();

export default Service;
