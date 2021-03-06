import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";
import { PostWithCount} from './posts-with-count.model';
import { Router } from "@angular/router";
import { Comment } from "./comment.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsWithCount: PostWithCount[] = [];
  private postsUpdated = new Subject<{posts: PostWithCount[], postCount: number}>();
  comments: Comment[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage:number, currentPage:number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts:number }>(
        "http://localhost:3000/api/posts"+queryParams
      )
      .pipe(map((postData) => {
        return {posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            userId: post.userId,
            comments: post.comments.length,
            likes: post.likes.length
          };
        }), maxPosts: postData.maxPosts};
      }))
      .subscribe(transformedPostData => {
        this.postsWithCount = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.postsWithCount],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{
      _id:string,
      title:string,
      content:string,
      imagePath: string,
      userId: string,
      comments: any[],
      likes: any[]
    }>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string, post: Post }>("http://localhost:3000/api/posts", postData)
      .subscribe(responseData => {
        this.router.navigate(["posts"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if(typeof(image)==='object'){
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else{
      postData = {
        id:id,
        title:title,
        content:content,
        imagePath:image,
        userId: null
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["posts"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }

  addComment(userId:string, postId: string, commenterId: string, comment: string){
    return this.http
      .post(`http://localhost:3000/api/v1/users/${userId}/posts/${postId}/comments/${commenterId}`, {comment:comment});
  }

  getComments(userId:string, postId:string){
    // userId: string;
    // userFullName: string;
    // comment: string;
    // isAnonymous: boolean;
    // createdAt: Date;
    // updatedAt: Date;
    // this.comments.push({
    //   comm
    // });
    // /:userid/posts/:postid/comments
    return this.http
      .get(`http://localhost:3000/api/v1/users/${userId}/posts/${postId}/comments`);
  }

  likeUnlike(userId:string, postId: string, liker_id: string){
    return this.http.post(`http://localhost:3000/api/v1/users/${userId}/posts/${postId}/likes/${liker_id}`, null);
  }

}
