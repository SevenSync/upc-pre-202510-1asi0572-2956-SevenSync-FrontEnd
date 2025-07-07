import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // If the token exists, add it to the request headers
  const handledRequest = token
    ? request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })
    : request;

  console.log('Request intercepted:', handledRequest);

  // Return the handled request
  return next(handledRequest);
};
