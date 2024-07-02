import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NotauthGuard {
    constructor(private router: Router) {}

    canActivate(): boolean {
        /* ----------------- Si l'utilisateur n'est pas authentifié ----------------- */
        if (this.isLoggedIn() == false) {
            return true;
        } else {
            /* ------------ Si il est déja authentifié pas d'accès au login ------------ */
            this.router.navigate(['/bo']);
            return false;
        }
    }

    /* ----------------- Vérifier si l'utilisateur est connécté ----------------- */
    isLoggedIn(): boolean {
        if (localStorage.getItem('jwt_token')) {
            if (this.get_DataSession('jwt_token') != null) {
                try {
                    // debut du try
                    let token: any = jwt_decode(
                        this.get_DataSession('jwt_token')
                    );
                    if (token['unique_claim'] == environment.unique_claim) {
                        return true;
                    } else {
                        this.ClearSession();
                        return false;
                    }
                } catch (Error: any) {
                    this.ClearSession();
                    return false;
                }
            } else {
                this.ClearSession();
                return false;
            }
        } else {
            this.ClearSession();
            return false;
        }
    }

    /* ------------------ Si la variable existe sur la session ------------------ */
    get_DataSession(key: any): any {
        if (localStorage.getItem(key)) {
            let result: any = this.decryptUsingAES256(
                localStorage.getItem(key)
            );
            if (result != null) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    decryptUsingAES256(data: any): any {
        let bytes = CryptoJS.AES.decrypt(
            data.toString(),
            environment.CRYPTAGE_KEY
        );
        if (bytes['sigBytes'] > 0) {
            let data = bytes.toString(CryptoJS.enc.Utf8);
            if (
                /^[\],:{}\s]*$/.test(
                    data
                        .replace(/\\["\\\/bfnrtu]/g, '@')
                        .replace(
                            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            ']'
                        )
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
                )
            ) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    ClearSession() {
        localStorage.clear();
    }
}
