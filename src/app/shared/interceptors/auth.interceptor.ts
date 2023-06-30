import { HttpInterceptorFn } from '@angular/common/http';

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = req.headers
      .set('Accept', 'appliction/json')
      .set('Authorization', `Bearer ${token}`);

    req = req.clone({ headers });
  }

  return next(req);
};
