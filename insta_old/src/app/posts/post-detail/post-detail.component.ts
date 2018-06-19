import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  private postsSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  postId: string;

  constructor(public postsService: PostsService, private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('postId');
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = { id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath, userId: postData.userId };
      });
    });
  }

  onComment(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.postsService.addComment(this.post.userId, this.postId, this.userId, form.value.comment);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      // this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  like(postId: string) {
    alert('liked');
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
