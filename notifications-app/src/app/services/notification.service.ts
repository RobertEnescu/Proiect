import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private connection: signalR.HubConnection | null;
  public notificationSubject: BehaviorSubject<boolean>;

  constructor() {
    this.notificationSubject = new BehaviorSubject(false);
    this.connection = null;
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:7185/hub/notifications')
      .build();

    this.connection.on('message_received', (body: any) => {
      console.log(body);
      this.notificationSubject.next(true);
    });

    this.connection.start().then(() => {
      // Here we can configure what to do upon starting the connection
    });
  }

  sendMessage(methodName: string, parameters?: any[]) {
    if (this.connection) {
      this.connection.send(methodName, parameters);
    }
  }
}
