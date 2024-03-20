import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list/list.component';
import { UpdateComponent } from './update/update/update.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

const routes: Routes = [
  {path:'list',component:ListComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'hobbies',component:HobbiesComponent} ,
  {path:'',redirectTo:'list',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
