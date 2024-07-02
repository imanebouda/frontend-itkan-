import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class RolesGuard {
    public profil: any;
    public profilconnected: any;
    constructor(private router: Router) {}

    // le id_from_base64_to_md5 est le id_role // crypté en base64 puis en md5

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let expected_roles: any[] = route.data['roles'];
        /* -------------------- Si l'utilisateur est autorisé ------------------- */
        if (expected_roles.includes(this.Get_claim('id_from_base64_to_md5'))) {
            return true;
        } else {
            /* ----------------- Si l'utilisateur n'est pas autorisé ----------------- */
            Swal.fire({
                icon: 'error',
                title: 'Accès interdit',
                showConfirmButton: false,
                timer: 2000,
            });
            this.router.navigate(['/accueil']);
            return false;
        }
    }

    Get_claim(claim: any) {
        let result: any = jwt_decode(this.get_DataSession('jwt_token'));
        return result[claim];
    }

    isSupperAdmin(): boolean {
        this.profil = environment.supperadmin;
        this.profilconnected = this.get_DataSession('Roles_name');
        return this.profil == this.profilconnected;
    }

    isAdministateur(): boolean {
        this.profil = environment.Administateur;
        this.profilconnected = this.get_DataSession('Roles_name');
        return this.profil == this.profilconnected;
    }

    get_DataSession(key: any): any {
        /* ------------------ Si la variable existe sur la session ------------------ */
        if (localStorage.getItem(key)) {
            let result: any = this.decryptUsingAES256(
                localStorage.getItem(key)
            );
            if (result != null) {
                return result != null ? result : null;
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
}
