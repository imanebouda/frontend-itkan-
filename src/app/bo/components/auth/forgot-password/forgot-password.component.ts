import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GeneralService, UtilisateursService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
    `
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `,
],
})
export class ForgotPasswordComponent {
  valCheck: string[] = ['remember'];
  is_loading: boolean = false;
  Login: Subscription;
  FormulaireMotDePasseOublie: FormGroup;
  ApiMessage: any;
  IsHidden: boolean = false;
  IsFiled: boolean = false;
  Error: any = 0;

  constructor(
      public layoutService: LayoutService,
      private utilisateursService: UtilisateursService,
      private GeneralService: GeneralService,
      private router: Router
  ) {
      this.GeneralService.if_load = false; // suppression du loader
      /* ------------------ Initialisation du formulaire de login ----------------- */
      this.FormulaireMotDePasseOublie = new FormGroup({
        email: new FormControl(null, [
              Validators.maxLength(100),
              Validators.required,
              Validators.email, 
          ]),
         
      });
  }

  ngOnInit(): void {
      setTimeout(() => {
          this.is_loading = false;
      }, 500);
  }

  /* -------------------------------------------------------------------------- */
  /*                         Les fonctions pour le login                        */
  /* -------------------------------------------------------------------------- */

  get loginErrors() {
      return this.FormulaireMotDePasseOublie.controls;
  }

  EnvoyerDemandeRecuperation() {
    this.IsFiled = true;
    if (this.FormulaireMotDePasseOublie.valid) {
        this.is_loading = true;
        const userEmail = this.FormulaireMotDePasseOublie.value.email.replace(/\s/g, '');
        const body = {
            email: userEmail,
        };
        this.utilisateursService.PasswordForgotten(body)
            .subscribe((response: any) => {
                response = JSON.parse(response);
                console.log(response);
                if (
                    response?.codeReponse === 200 &&
                    response?.IsSucceed == true
                ) {

                    const messageContent = 'Bonjour, vous avez demandé une réinitialisation de mot de passe. Votre code de réinitialisation est : ' + response?.data;
                    emailjs.send('service_vr9nmba', 'template_iga7x5m', {
                        message: messageContent,
                        From: 'iitkanSys@gmail.com',
                        To: userEmail,
                        subject: 'Objet : Mot de passe oublié',
                        code: response?.data
                    }, 'bHLw8k-NqAWaFmyi2')
                        .then((result: EmailJSResponseStatus) => {
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });

                    this.IsHidden = false;
                    this.ApiMessage = 'Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception.';
                    this.Error = 0;

                    this.IsHidden = false;
                    this.ApiMessage = 'Un lien de réinitialisation a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception.';
                    this.Error = 0;
                    setTimeout(() => {
                        this.router.navigate(['/auth']);
                    }, 1000);
                } else {
                    if (response?.codeReponse === 'error' && response?.msg === 'Unknown record') {
                        this.ApiMessage = 'Adresse e-mail introuvable. Veuillez vérifier votre saisie.';
                    } else {
                        this.ApiMessage = response?.msg || 'Une erreur est survenue';
                    }
                    this.error();
                }
            }, (error) => {
                this.ApiMessage = 'Une erreur est survenue : ' + error.message;
                this.error();
            });
    } else {
        this.ApiMessage = 'Veuillez saisir les informations manquantes correctement.';
        this.error();
    }
}



  
  /* -------------------------------------------------------------------------- */
  /*                            Les autres fonctions                            */
  /* -------------------------------------------------------------------------- */

  error() {
      this.IsHidden = false;
      this.Error = 2;
      this.is_loading = false;
      setTimeout(() => {
          this.IsHidden = true;
      }, 500);
  }

  ngOnDestroy(): void {
      let unsubscribe: any[] = [this.Login];
      unsubscribe.forEach((element: any) => {
          if (element) {
              element.unsubscribe();
          }
      });
  }

}
