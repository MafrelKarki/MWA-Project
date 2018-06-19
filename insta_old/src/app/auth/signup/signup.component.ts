import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private statusSub: Subscription;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.statusSub = this.userService.getStatusListener().subscribe(
      status => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.createUser(form.value.name, form.value.email, form.value.password);
  }

  ngOnDestroy(){
    this.statusSub.unsubscribe();
  }

}
