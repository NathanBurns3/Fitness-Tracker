import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  // Might need to change
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
}
