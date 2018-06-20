// @author: Mafrel

import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { SearchService } from '../search.service';
import { AuthService } from '../auth/auth.service';
import { FollowService } from '../follow.service';
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
  private userId: string;

  private followStatus: boolean;
  private followMessage: string;

  constructor(private authService: AuthService,
    private searchService: SearchService,
    private router: Router,
    private followService: FollowService,
    private element: ElementRef,
    private renderer: Renderer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];
      this.obsSearchUserById = this.searchService.searchUserById(userId).subscribe(response => {
        this.user = response['user'];
      });
    });


    this.userId = this.authService.getUserId();
    // console.log(this.userId);
  }

  ngOnDestroy() {
    this.obsSearchUserById.unsubscribe();
  }

  followUser(searched: String, follower: String) {


    console.log("searched id  " + searched);
    console.log("follower id " + follower);

    this.followService.followAUser(searched, follower).subscribe(response => {
      console.log(response['data']);
      if (response['data'] == 'unfollow') {
        // this.element.nativeElement.style.color = "red";
        // element.textContent = "Follow";
      } else {
        // element.textContent = "Unfollow";
        // this.element.nativeElement.style.color = "green";
      }
    });

  }


}
