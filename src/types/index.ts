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

export type Note = {
  id: string;
  text: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
};
