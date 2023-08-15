import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement';
import { Category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private announcementService: AnnouncementService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  title = 'notifications-app';
  notificationMessage: string;

  filteredAnnouncements: Announcement[] = [];
  deleteAnnouncement(id: string) {
    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.filterAnnouncements(null);
    });
  }

  filterAnnouncements(selectedCategory: string) {
    if (!selectedCategory) {
      this.announcementService.getAnnouncements().subscribe((announcements) => {
        this.filteredAnnouncements = announcements;
      });
      return;
    }
    this.announcementService.getAnnouncements().subscribe((announcements) => {
      this.filteredAnnouncements = announcements.filter(
        (announcement) => announcement.categoryId === selectedCategory
      );
    });
  }

  ngOnInit(): void {
    this.filterAnnouncements(null);
    this.notificationService.initWebSocket();
    this.notificationService.notificationSubject.subscribe(
      (hasNotifications) =>
        (this.notificationMessage = hasNotifications
          ? 'New notifications, please refresh the page'
          : '')
    );
  }
}
