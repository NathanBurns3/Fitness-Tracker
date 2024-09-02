import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export function getHeaders(router: Router): HttpHeaders {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    router.navigate(['/login']);
    return new HttpHeaders();
  }

  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
}

function isTokenExpired(token: string): boolean {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
}
