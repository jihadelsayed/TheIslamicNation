import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable()
export class httpInterceptor implements HttpInterceptor {
  intercept(
      request: HttpRequest<any>, next: HttpHandler
      ): Observable<HttpEvent<any>> {
      
    const customReq = request.clone({});
    return next.handle(request).pipe(
        catchError((error:HttpErrorResponse)=>{

            if(error instanceof HttpErrorResponse){
              if (error.status === 401) {
                
                // auto logout if 401 response returned from api
                localStorage.removeItem('userToken');
                //this.router.navigate(['/login']);
                  location.reload();
            }
          //  console.log(error)

                // server error
                return throwError(error)
              }else{
                // client side error
                return throwError(error)

              }
        })
    );
  }
}