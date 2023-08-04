import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'service-worker';
  hostUrl = 'https://64911dd82f2c7ee6c2c7beb6.mockapi.io/api/v1/';
  readonly VAPID_PUBLIC_KEY =
    'BFBSajEnr8FG-MSH2ni6BSAZ1VtBlNkmVsk0ohNwJNxp6FC98Ng4J4zNS-nOJU5MZ-vIIHceR5N2SXLnMai0vMg';
  users: any[] = [];

  constructor(
    private titleService: Title,
    private swPush: SwPush,
    private httpClient: HttpClient
  ) {
    this.titleService.setTitle(`(5) My Website`);
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log('Push Subscription object', sub))
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }

  fetchData() {
    const url = this.hostUrl + 'users';
    this.httpClient.get(url).subscribe((res:any) =>{
      if (res){
        console.log("my users", res);
        this.users = res;
      }
    })
  }

  clearData(){
    this.users = [];
  }
}
