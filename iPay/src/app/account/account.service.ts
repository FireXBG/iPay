import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  apiUrl = "http://localhost:3001/assets";

  constructor(private http: HttpClient) {
  }

  getBalance() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/getAssets?token=${token}`);
  }

  addBalance(data: any) {
    const token = localStorage.getItem('token');
    data = {...data, token};
    return this.http.post(`${this.apiUrl}/addAsset`, data);
  }

  sendBalance(data: any) {
    const token = localStorage.getItem('token');
    data = {...data, token};
    return this.http.post(`${this.apiUrl}/sendAsset`, data);
  }

  getTransactions() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/getHistory?token=${token}`);
  }
}
