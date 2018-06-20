import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private searchQuery: String;
  private users: any;

  constructor(private authService: AuthService, private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // @author:  Mafrel
  search(event) {
    this.searchService.searchUserByEmail(event.target.value).subscribe(response => {
      this.users = response['searchedUsers'];
    });
  }

  // @author: Mafrel
  viewUserProfile(userId: String) {
    this.router.navigate(['user/' + userId]);
  }

}
