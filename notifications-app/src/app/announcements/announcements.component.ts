import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementComponent {
  @Input() announcement: Announcement;
  @Output() deleteAnnouncement = new EventEmitter<string>();
  constructor(private router: Router) {}

  onDeleteClick() {
    this.deleteAnnouncement.emit(this.announcement.id);
  }
  onEditClick() {
    this.router.navigate(['/edit', this.announcement.id]);
  }
  getTagClass(categoryId: string): string {
    switch (categoryId) {
      case 'General':
        return 'tag tag-teal';
      case 'Laboratory':
        return 'tag tag-pink';
      case 'Course':
        return 'tag tag-purple';

      default:
        return 'tag';
    }
  }
}
