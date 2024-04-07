import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token: any = localStorage.getItem('access_token');
  console.log(token);
  token = token?.split(' ')[1];
  console.log(token);

  const reqAuth = req.clone({
    setHeaders: {
      // 'x-auth-token': `${token}`,
      'x-auth-token': token,
    },
  });
  console.log(`in interceptors`);

  return next(reqAuth);
};
