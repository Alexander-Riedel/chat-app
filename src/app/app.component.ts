import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';
import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [CommonModule, AsyncPipe, IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent],
    standalone: true,
})
export class AppComponent {
    constructor(public auth: AuthService) { }

    async onLogout() {
        await this.auth.deleteAnonUser();
    }
}
