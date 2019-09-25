import { NoteStatus } from './backend';

export type Note = {
  id: string;
  text: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};

export * from './backend';
