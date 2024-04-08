import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let token: any = localStorage.getItem('access_token');
  if (token) {
    console.log(token);
    token = token?.split(' ')[1];
    token = token.substring(0, token.length);
  }

  const reqAuth = req.clone({
    setHeaders: {
      // 'x-auth-token': `${token}`,
      'x-auth-token': token,
    },
  });
  console.log(`in interceptors`);

  // return next(reqAuth);
  return next(req);
};
