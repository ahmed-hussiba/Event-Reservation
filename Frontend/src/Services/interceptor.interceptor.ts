import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const reqAuth = req.clone({
    setHeaders: {
      'x-auth-token': `${token}`,
    },
  });
  console.log(`in interceptors`);

  return next(reqAuth);
};
