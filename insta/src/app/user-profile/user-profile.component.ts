import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private obsSearchUserById;
  private user;

  private posts;
  private paramSubscription;
  private userSubscription;
  private postsSubscription;
  private followSubscription;
  private updateProfileSubscription;
  public tab: string = 'posts';
  private profilePicture: string;
  private tmpProfile: string;
  public mode: string = 'view';
  private fullname: string;
  public myself: boolean = false;
  private following: boolean = false;
  private bio: string;
  constructor(private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];
      this.obsSearchUserById = this.searchService.searchUserById(userId).subscribe(response => {
        this.user = response['user'];
        this.fullname = `${this.user.fullName}`;
      });
    });
  }

  ngOnDestroy() {
    this.obsSearchUserById.unsubscribe();
  }

}
