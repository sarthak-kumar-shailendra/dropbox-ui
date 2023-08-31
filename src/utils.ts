import moment from 'moment';
const BASE = 'http://localhost:8080/';
const API_V1 = `${BASE}/v1/`

export const getAllFiles =  () => `${BASE}files`;
export const getFile =  (fileId: string) => `${BASE}files/${fileId}`;
export const postFile = () => `${BASE}files/upload`;

export interface IFiles {
    id: string,
    fileName: string,
    type: string,
    size: number,
    createdAt: moment.Moment,
    updatedAt: moment.Moment,
  }