import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { UserData } from "./user-data.model";

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: "root" })
export class UserService {

    constructor(private http: HttpClient, private router: Router) { }

    createUser(name: string, email: string, password: string) {
        const userData: UserData = { name: name, email: email, password: password };
        this.http.post(BACKEND_URL + "/signup", userData).subscribe(
            response => {
                console.log("login");
                this.router.navigate(["auth/login"]);
            }
        );
    }

}
