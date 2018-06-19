import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostWithCount } from '../posts-with-count.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: PostWithCount;
  private postsSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  postId: string;
  comments: Comment[] = [];

  constructor(public postsService: PostsService, private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('postId');
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = { id: postData._id, 
          title: postData.title, 
          content: postData.content, 
          imagePath: postData.imagePath, 
          userId: postData.userId,
          comments: postData.comments.length,
          likes: postData.likes.length,
          liked: false
        };
      });
      this.postsService.getComments(this.userId, this.postId).subscribe(comments=>{
        // comments[0]['userId']
        this.comments = comments['comments'];        
      });
    });
  }

  onComment(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.postsService.addComment(this.post.userId, this.postId, this.userId, form.value.comment)
      .subscribe(()=>{
        form.reset();
        this.postsService.getComments(this.userId, this.postId).subscribe(comments=>{
          this.comments = comments['comments'];        
        });
      });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      // this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  like(postId: string, post: PostWithCount) {
    // this.postsService.likeUnlike(post.userId, post.id, this.userId).subscribe(()=>{
    //   if(post.liked){
    //     post.likes--;
    //   } else {
    //     post.likes++;
    //   }
    //   post.liked = !post.liked;
    // });
    if(post.liked){
      post.likes--;
    } else {
      post.likes++;
    }
    post.liked = !post.liked;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
