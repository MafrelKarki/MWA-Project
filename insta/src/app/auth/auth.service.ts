import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { UserData } from "./user-data.model";
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: "root" })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        response => {
          this.router.navigate(["/posts"]);
        }
      );
  }

}
