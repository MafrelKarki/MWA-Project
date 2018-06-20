import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/';


@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  followAUser(searched_id: String, follower_id: String) {
    return this.http.post(BACKEND_URL + 'v1/users/' + searched_id + '/follow/' + follower_id, null);

  }

}
