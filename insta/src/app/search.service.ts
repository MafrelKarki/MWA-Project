import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchUserByEmail(query: String) {
    return this.http.get(BACKEND_URL + 'v1/users/txt/search?email=' + query);
  }

  searchUserById(userId: string) {
    return this.http.get(BACKEND_URL + 'user/' + userId);
  }


}
