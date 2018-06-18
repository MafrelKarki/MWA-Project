import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { UserData } from "./user-data.model";

const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({ providedIn: "root" })
export class UserService {

    private statusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    getStatusListener() {
        return this.statusListener.asObservable();
    }

    createUser(name: string, email: string, password: string) {
        const userData: UserData = { name: name, email: email, password: password };
        this.http.post(BACKEND_URL + "/signup", userData).subscribe(
            response => {
                this.router.navigate(["auth/login"]);
            },
            error => {
                this.statusListener.next(false);
            }
        );
    }

}
