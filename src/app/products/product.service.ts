import { Injectable } from "@angular/core";
import { IProduct } from "./product";

import { catchError, tap, find, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productUrl = "api/products/products.json";

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getProduct(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      map((data: IProduct[]) =>
        data.find((data: IProduct) => data.productId === id)
      ),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    //instead of jsut logging it to the console
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //The backend returned an unsuccessful response code.
      //The response body may contain cleus as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
