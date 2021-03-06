import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './auth/auth.guard';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'auth/login', component: LoginComponent},
  {path:'auth/signup', component: SignupComponent},
  {path:'create', component:PostCreateComponent, canActivate: [AuthGuard]},
  {path:'posts', component:PostListComponent, canActivate: [AuthGuard]},
  {path:'edit/:postId', component:PostCreateComponent, canActivate: [AuthGuard]},
  {path:'detail/:postId', component:PostDetailComponent, canActivate: [AuthGuard]},
  {path: 'user/:userId', component:UserProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
