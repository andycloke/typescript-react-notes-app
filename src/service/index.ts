import { Note } from '../types';

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const timeout1s = () => timeout(500);

export enum NoteStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export type NotePostRequest = {
  text: string;
  status: NoteStatus;
};

export type NoteResponse = {
  id: string;
  text: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type NotesResponse = NoteResponse[];

export type NotePatchRequest = Partial<NotePostRequest>;

class NoteService {
  notes: Note[] = [];

  getNotes = async (): Promise<NotesResponse> => {
    await timeout1s();
    return this.notes;
  };

  getNote = async (id: string): Promise<NoteResponse> => {
    await timeout1s();
    const note = this.notes.find(note => note.id === id);
    if (note) {
      return note;
    } else {
      throw new Error(`Note with id: ${id} 'does not exist`);
    }
  };

  postNote = async (body: NotePostRequest) => {
    await timeout1s();
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
    await timeout1s();
    const existingNote = this.notes.find(note => note.id === id);
    if (existingNote) {
      const updatedNote: Note = {
        ...existingNote,
        ...body
      };
      this.notes = this.notes.map(note => (note.id === id ? updatedNote : note));
      return updatedNote;
    } else {
      throw new Error(`Note with id: ${id} 'does not exist`);
    }
  };

  deleteNote = async (id: string) => {
    await timeout1s();
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
