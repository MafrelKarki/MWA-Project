import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'auth/login', component: LoginComponent},
  {path:'auth/signup', component: SignupComponent},
  {path:'create', component:PostCreateComponent},
  {path:'posts', component:PostListComponent},
  {path:'edit/:postId', component:PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
