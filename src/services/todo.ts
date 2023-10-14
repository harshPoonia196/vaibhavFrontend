import client from './client';

export function getAllToDos() {
  return client.get('/users');
}
