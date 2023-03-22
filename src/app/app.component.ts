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
  readonly VAPID_PUBLIC_KEY =
    'BFBSajEnr8FG-MSH2ni6BSAZ1VtBlNkmVsk0ohNwJNxp6FC98Ng4J4zNS-nOJU5MZ-vIIHceR5N2SXLnMai0vMg';

  constructor(
    private titleService: Title,
    private swPush: SwPush,
  ) {
    this.titleService.setTitle(`(5) My Website`);
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log("Push Subscription object", sub))
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
