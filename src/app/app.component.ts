import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [CommonModule, AsyncPipe, IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent],
    standalone: true,
})
export class AppComponent {
    constructor(public auth: AuthService, private router: Router) {
        this.auth.user$
            .pipe(filter(user => !!user))
            .subscribe(() => {
                this.router.navigateByUrl('/chat');
            });
    }

    async onLogout() {
        await this.auth.deleteAnonUser();
        this.router.navigateByUrl('/');
    }
}
