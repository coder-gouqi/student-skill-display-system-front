import { post } from '@/api/http';

export const scoreAdd = (params) => post('/score/add', params);

export const scoreUpdate = (params) => post('/score/update', params);

export const scoreDelete = (params) => post('/score/delete', params);

export const scoreQuery = (params) => post('/score/list/page', params);

export const scoreSelectAll = (params) => post('/score/select', params);

export const scoreUpload = (params) => post('/file/upload', params);
