import { Injectable } from '@angular/core';
import { Announcement } from '../announcement';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private baseURL = 'http://localhost:7185/Announcements';

  constructor(private http: HttpClient) {}

  serviceCall() {
    console.log('Service was called');
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.baseURL);
  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    const url = `${this.baseURL}/create`;
    return this.http.post<Announcement>(url, announcement, this.httpOptions);
  }
  deleteAnnouncement(id: string): Observable<Announcement> {
    const url = `${this.baseURL}/delete/${id}`;
    return this.http.delete<Announcement>(url);
  }
  updateAnnouncement(announcement: Announcement): Observable<Announcement> {
    const url = `${this.baseURL}/update/${announcement.id}`;
    return this.http.put<Announcement>(url, announcement, this.httpOptions);
  }
  getAnnouncement(id: string): Observable<Announcement> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Announcement>(url);
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}
