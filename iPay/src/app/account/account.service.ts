import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  apiUrl = "http://localhost:3001/assets";
  constructor(private http: HttpClient) {}

  getBalance() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/getAssets?token=${token}`);
  }

  addBalance(data: any) {
    const token = localStorage.getItem('token');
    data = { ...data, token };
    this.http.post(`${this.apiUrl}/addAsset`, data).subscribe((res: any) => {
      return res;
    })
  }
}