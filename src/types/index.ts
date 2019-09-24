import { NoteStatus } from '../service';

export type Note = {
  id: string;
  text: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};
