import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const reqAuth = req.clone({
    setHeaders: {
      Authorization: `${token}`,
    },
  });
  console.log(`in interceptor`);

  return next(reqAuth);
};
