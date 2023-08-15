import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from '../announcement';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-edit-announcement-form',
  templateUrl: './edit-announcement-form.component.html',
  styleUrls: ['./edit-announcement-form.component.scss'],
})
export class EditAnnouncementFormComponent implements OnInit {
  announcement: Announcement;
  title: string;
  author: string;
  message: string;
  imageUrl: string;
  categorySelected: string;
  listOfCategories: string[] = ['Course', 'General', 'Laboratory'];

  constructor(
    private announcementService: AnnouncementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const announcementId = this.route.snapshot.paramMap.get('id');
    this.loadAnnouncement(announcementId);
  }

  loadAnnouncement(id: string) {
    this.announcementService.getAnnouncement(id).subscribe((announcement) => {
      this.announcement = announcement;
      this.title = announcement.title;
      this.author = announcement.author;
      this.message = announcement.message;
      this.imageUrl = announcement.imageUrl;
      this.categorySelected = announcement.categoryId;
    });
  }

  onUpdateClick() {
    const updatedAnnouncement: Announcement = {
      id: this.announcement.id,
      title: this.title,
      author: this.author,
      message: this.message,
      imageUrl: this.imageUrl,
      categoryId: this.categorySelected,
    };

    this.announcementService
      .updateAnnouncement(updatedAnnouncement)
      .subscribe(() => {
        console.log('Announcement updated successfully.');
        this.router.navigateByUrl('/home');
      });
  }
}
