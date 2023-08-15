import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement';
import { Category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-announcement-form',
  templateUrl: './add-announcement-form.component.html',
  styleUrls: ['./add-announcement-form.component.scss'],
})
export class AddAnnouncementFormComponent {
  constructor(
    private announcementService: AnnouncementService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  printInput() {
    console.log(
      this.title,
      this.author,
      this.message,
      this.imageUrl,
      this.categorySelected
    );
  }
  addAnn() {
    const announcement: Announcement = {
      title: this.title,
      author: this.author,
      message: this.message,
      imageUrl: this.imageUrl,
      categoryId: this.categorySelected,
    };
    this.announcementService.addAnnouncement(announcement).subscribe((r) => {
      this.notificationService.sendMessage('BroadcastMessage', [r]);
      this.router.navigateByUrl('/home');
    });
  }
  title: string;
  author: string;
  message: string;
  imageUrl: string;
  categorySelected: string;

  listOfCategories: string[] = ['Course', 'General', 'Laboratory'];
}
