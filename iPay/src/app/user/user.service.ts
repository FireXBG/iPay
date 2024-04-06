import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl = "http://localhost:3001/auth";

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    const token = localStorage.getItem("token");
    this.http.post(`${this.apiUrl}/logout`, { token }).subscribe((res) => {
      localStorage.removeItem("token");
      this.router.navigate(["/"]);
    }, catchError((error) => {
      console.log(error);
      alert("Error logging out, please inform the administrator!");
      this.router.navigate(['/']);
      return error;
    }))
  }
}
