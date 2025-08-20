import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Auth, signInAnonymously, signOut, user } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth = inject(Auth);
    private injector = inject(Injector);

    user$ = user(this.auth);
    uid$ = this.user$.pipe(map(u => u?.uid ?? null));

    signInAnon() {
        return runInInjectionContext(this.injector, () => signInAnonymously(this.auth));
    }

    signOut() {
        return runInInjectionContext(this.injector, () => signOut(this.auth));
    }
}