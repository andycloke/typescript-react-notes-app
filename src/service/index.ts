import axios from 'axios';
import { NotesResponse, NoteResponse, NotePostRequest, NotePatchRequest } from '../types';
class NoteService {
  service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/notes` });

  getNotes = async (): Promise<NotesResponse> => {
    return (await this.service.get<NotesResponse>('')).data;
  };

  getNote = async (id: string): Promise<NoteResponse> => {
    return (await this.service.get<NoteResponse>(`/${id}`)).data;
  };

  postNote = async (body: NotePostRequest) => {
    return (await this.service.post<NoteResponse>('', body)).data;
  };

  patchNote = async (id: string, body: NotePatchRequest) => {
    return (await this.service.patch<NoteResponse>(`/${id}`, body)).data;
  };

  deleteNote = async (id: string) => {
    return this.service.delete(`/${id}`);
  };
}

const Service = new NoteService();

export default Service;
