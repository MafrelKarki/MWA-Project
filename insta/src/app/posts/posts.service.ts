import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage:number, currentPage:number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts:number }>(
        "http://localhost:3000/api/v1/posts"+queryParams
      )
      .pipe(map((postData) => {
        return {posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
<<<<<<< HEAD
            imagePath: post.imageUrl,
            creator: post.creator
=======
            imagePath: post.imagePath,
            userId: post.userId
>>>>>>> 45de0d0ddd66be8e71f8e5851baa3298b39052ed
          };
        }), maxPosts: postData.maxPosts};
      }))
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
<<<<<<< HEAD
    return this.http.get<{_id:string, title:string, content:string, imagePath: string, creator: string}>("http://localhost:3000/api/v1/posts/" + id);
=======
    return this.http.get<{
      _id:string, 
      title:string, 
      content:string, 
      imagePath: string, 
      userId: string
    }>("http://localhost:3000/api/posts/" + id);
>>>>>>> 45de0d0ddd66be8e71f8e5851baa3298b39052ed
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string, post: Post }>("http://localhost:3000/api/v1/posts", postData)
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
      .put("http://localhost:3000/api/v1/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["posts"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/v1/posts/" + postId);
  }

<<<<<<< HEAD
  addComment(postId: string, userId: string){

=======
  addComment(userId:string, postId: string, commenterId: string, comment: string){
    // Post- /api/v1/users/:userid/posts/:postid/comments/:commenterId
    this.http
      .post(`http://localhost:3000/api/v1/users/${userId}/posts/${postId}/comments/${commenterId}`, {comment:comment})
      .subscribe(responseData => {
        alert("Comment posted");
      });
>>>>>>> 45de0d0ddd66be8e71f8e5851baa3298b39052ed
  }

}
