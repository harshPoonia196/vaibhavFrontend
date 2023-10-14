import client from './client';

export function getAllToDos(query: any) {
  return client.post('/users', query);
}
