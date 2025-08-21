import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Auth, signInAnonymously, signOut, deleteUser, user } from '@angular/fire/auth';
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

    async deleteAnonUser() {
        return runInInjectionContext(this.injector, async () => {
            if (this.auth.currentUser) {
                await deleteUser(this.auth.currentUser);
            }
        });
    }

    signOut() {
        return runInInjectionContext(this.injector, () => signOut(this.auth));
    }
}