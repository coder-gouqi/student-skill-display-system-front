import { post } from '@/api/http';

export const skillLevelAdd = (params) => post('/skillLevel/add', params);

export const skillLevelUpdate = (params) => post('/skillLevel/update', params);

export const skillLevelDelete = (params) => post('/skillLevel/delete', params);

export const skillLevelQuery = (params) => post('/skillLevel/list/page', params);

export const skillLevelUpload = (params) => post('/file/upload', params);
