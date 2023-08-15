import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddAnnouncementFormComponent } from './add-announcement-form/add-announcement-form.component';
import { HomeComponent } from './home/home.component';
import { EditAnnouncementFormComponent } from './edit-announcement-form/edit-announcement-form.component';

const routes: Routes = [
  { path: 'add', component: AddAnnouncementFormComponent },
  { path: 'edit/:id', component: EditAnnouncementFormComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
