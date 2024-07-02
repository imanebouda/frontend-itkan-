import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CrypteService } from '../crypte/crypte.service';
const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})

/* ------------------- jwt_token est le jwt token ------------------- */
export class GeneralService {
    public if_load: boolean = true;
    public is_loading: boolean = false;
    public currentMenu: any;
    public innerWidth: any = window.innerWidth; // innerWidth>=992 (web) // innerWidth<992 (mobile)
    public menu_toggel: boolean = true;

    constructor(private CryprtService: CrypteService, private router: Router) { }

    /* -------------------------------------------------------------------------- */
    /*                     Fonction de l'exportation en excel                     */
    /* -------------------------------------------------------------------------- */
    exportAsExcelFile(json: any, excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    GetCurrentRole() {
        let jwt_token: any = this.get_DataSession('jwt_token');
        let id_role: any = this.DecodeJwt(jwt_token, 'id_from_base64_to_md5'); // en base64 puis md5
        return id_role;
    }

    GotoToaccueil() {
        if (this.router.url != '/accueil') {
            this.currentMenu = '/accueil';
            this.router.navigate(['/accueil']);
        }
    }

    /* --------------- Récupération d'une valeur depuis une liste --------------- */
    Get_libelle(
        identifiant: any = null,
        liste: any[] = [],
        prop: any = 'label'
    ) {
        if (identifiant && liste.length > 0) {
            return liste.find(
                (element: any) => Number(element?.value) == Number(identifiant)
            )?.[prop];
        } else {
            return null;
        }
    }

    destroySession() {
        Swal.fire({
            title: 'Fermeture de session',
            html: `<b>Êtes-vous sûr de vouloir fermer votre session ? </b>`,
            icon: 'info',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#258662',
            cancelButtonColor: '#f50707',
            confirmButtonText: 'Valider',
        }).then((result: any) => {
            if (result?.value) {
                /* ------------------------ Déstruction de la session ----------------------- */
                localStorage.clear();
                setTimeout(() => {
                    this.router.navigate(['/auth']);
                }, 100);
            } // fin if result swal
        }); // fin then swal
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    /* ------------------------- Gestion du localStorage ------------------------ */

    set_DataSession(body: any) {
        body.forEach((element: any) => {
            if (
                element?.key != null &&
                element?.key != '' &&
                element?.value != null
            ) {
                localStorage.setItem(
                    element?.key,
                    this.CryprtService.encryptUsingAES256(
                        element?.value
                    ).toString()
                );
            }
        });
        return true;
    }

    /* -------------------------------------------------------------------------- */
    /*                        Example of INVALID IP address                       */
    /* -------------------------------------------------------------------------- */

    // 210.110 – must have 4 octets
    // 255 – must have 4 octets
    // y.y.y.y – only digits are allowed
    // 255.0.0.y – only digits are allowed
    // 666.10.10.20 – octet number must be between [0-255]
    // 4444.11.11.11 – octet number must be between [0-255]
    // 33.3333.33.3 – octet number must be between [0-255]

    ValidateIPaddress(ipaddress: any) {
        if (
            /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/.test(
                ipaddress
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                             Vefivydomaine name                             */
    /* -------------------------------------------------------------------------- */

    ValidateDomaineName(domaine: any) {
        if (
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
                domaine
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    get_DataSession(key: any): any {
        /* ------------------ Si la variable existe sur la session ------------------ */
        if (localStorage.getItem(key)) {
            let result: any = this.CryprtService.decryptUsingAES256(
                localStorage.getItem(key)
            );
            if (result != null) {
                return result != null ? result : null;
            }
        } else {
            if (key == 'user_id') {
                localStorage.clear();
                setTimeout(() => {
                    this.router.navigate(['/auth']);
                }, 100);
            }
            return null;
        }
    }

    Get_claim(claim: any) {
        let result: any = jwt_decode(this.get_DataSession('jwt_token'));
        return result?.[claim];
    }

    /* ----------------------- Fonction pour décode le jwt ---------------------- */

    DecodeJwt(token: any, claim: any) {
        let result: any = jwt_decode(token);
        return result?.[claim];
    }

    GotoTop() {
        setTimeout(() => {
            // let element: any = document.getElementById("top_bar_html");
            // element.scrollIntoView({
            //   behavior: "smooth",
            //   block: "end",
            //   inline: "end",
            // });
        }, 100);
    }

    /* -------------------------------------------------------------------------- */
    /*       Pour l'ajout et modification et la recherche kendo date picker       */
    /* -------------------------------------------------------------------------- */
    FormatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    FormatDateHeure(input: any) {
        let date = new Date(input);
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return [year, month, day].join('-') + ' ' + hours + ':' + minutes;
    }

    GetFormatedDateNow() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return [year, month, day].join('-');
    }

    GetFormatedTimeNow() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return hours + ':' + minutes;
    }

    GetHeureMinutes(input: any) {
        let date = new Date(input);
        let d = new Date(date),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes();

        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return hours + ':' + minutes;
    }

    /* -------------------------------------------------------------------------- */
    /*                           la gestion des erreurs                           */
    /* -------------------------------------------------------------------------- */
    errorSwal(
        message: any,
        duration: any = 2000,
        icon: any = 'warning',
        text: any = '',
        showConfirmButton: any = false
    ) {
        // Swal.fire({
        //   icon: icon,
        //   title: message,
        //   text: text,
        //   showConfirmButton: showConfirmButton,
        //   timer: duration,
        // });
    }

    /* ------------------- Changer le format d'un nombre réel ------------------- */

    public numberWithCommas(number: number) {
        let test: any = number.toFixed(2);
        let parts: any = test.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }

    /* ---- Fonction pour Vérifier si un intervalle de deux dates est valide ---- */

    CheckIfDateValid(debut: any, fin: any) {
        let start = new Date(debut);
        let end = new Date(fin);
        let diff = end.valueOf() - start.valueOf();
        // la methode valueOf appliquée à une date retourne une valeur en millisecondes écoulées depuis le 1 janvier 1970 00h00
        if (diff / 3600000 > 0 || diff / 3600000 == 0) {
            // La durée converti des millisecondes en Heures
            return true;
        } // durée invalide
        else {
            return false;
        } // fin else la durée est invalide
    }

    GET_DATE_DIFF(debut: any, fin: any) {
        let start = new Date(debut);
        let end = new Date(fin);
        let diff = end.valueOf() - start.valueOf();
        return diff / 3600000 / 24 + 1; // en JOURS
    }


    canActivate(role: any): boolean {
        var permissions: any = this.get_DataSession("permissions")
        if (this.get_DataSession("id_role") == environment.id_role_superadministrateur) {
            return true
        }
        if (permissions != null) {
            var data: any[] = JSON.parse(permissions)
           return data.some((obj: any) => obj.name.toLowerCase() == role.toLowerCase())
        }
        else {
            return false
        }
    }

    canActivatePilote(p:any): boolean {
        const id_role = this.get_DataSession("id_role");
        if (id_role == environment.id_role_superadministrateur) {
          return true;
        }
        if (this.get_DataSession("Roles_name") == "Admin") {
            return true
        }
        return p?.Pilote == id_role || p?.CoPilote == id_role;
      }

    canActivateAll(roles: any[]): boolean {
        var permissions: any = this.get_DataSession("permissions")
        if (this.get_DataSession("Roles_name") == "Super admin") {
            return true
        }
        if (permissions != null) {
            var exist = false;
            var data: any[] = JSON.parse(permissions)
            for (let index = 0; index < roles.length; index++) {
                var role = roles[index];

                if (data.some((obj: any) => obj.name.toLowerCase() == role.toLowerCase())) {
                    exist = true;
                    break;
                }
            }

            return exist;
        }
        else {
            return false
        }
    }


    // get Id Form URL
    getProcessusID(routeName : string){
        const urlSegments = this.router.url.split('/');
        const idIndex = urlSegments.indexOf(`${routeName}`);
        if (idIndex !== -1 && idIndex < urlSegments.length - 1) {
            const str = urlSegments[idIndex + 1];
            const id = parseInt(str,10);
            return id;
        } else {
            return null;
        }
    }

     // get Id Form URL
     getProcedureID(routeName : string){
        const urlSegments = this.router.url.split('/');
        const idIndex = urlSegments.indexOf(`${routeName}`);
        if (idIndex !== -1 && idIndex < urlSegments.length - 1) {
            const str = urlSegments[idIndex + 1];
            const id = parseInt(str,10);
            return id;
        } else {
            return null;
        }
    }

      // get Id Form URL
      getIndicateurID(routeName : string){
        const urlSegments = this.router.url.split('/');
        const idIndex = urlSegments.indexOf(`${routeName}`);
        if (idIndex !== -1 && idIndex < urlSegments.length - 1) {
            const str = urlSegments[idIndex + 1];
            const id = parseInt(str,10);
            return id;
        } else {
            return null;
        }
    }



    successSwal(constatSupprimé: string) {


    }
}
