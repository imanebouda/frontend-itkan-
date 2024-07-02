import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { LibraryService } from 'src/app/services/library/library.service';
import { ProcDocumentsService } from 'src/app/services/procDocuments/procDocuments.service';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { GeneralService } from 'src/app/services/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-library',
  templateUrl: './list-library.component.html',
  styleUrls: ['./list-library.component.scss']
})
export class ListLibraryComponent {
  processusData: TreeNode[];
  selectedNode: TreeNode;
  is_loading: boolean = true;

  if_show_ajouter: boolean = false;
  if_show_proces_modifier: boolean = false;
  if_show_proc_modifier: boolean = false;
  data_selected_Dp: any;
  Header_info : any ;
  delete: any;


  constructor(
    private libraryService: LibraryService,
    private ProcesDocuments_src: ProcesDocumentsService,
    public generalService: GeneralService,
    private ProcDocuments_src : ProcDocumentsService,
    ) {}

  ngOnInit() {
    this.libraryService.getProcessusData().subscribe((data) => {
      this.processusData = this.formatData(data);
    });
  }

  private formatData(data: any): TreeNode[] {
    console.log(data)
     return data.data.map((processusItem: any) => {
       const processusNode: TreeNode = {
         key: processusItem.ProcessusID.toString(),
         label: processusItem.Processus,
         data: processusItem.Description,
         icon: 'pi pi-fw pi-inbox',
         children: [
            // Section "Procedures"
        {
          key: `${processusItem.ProcessusID}-procedures`,
          label: 'Procedures',
          data: 'Procedures Folder',
          icon: 'pi pi-fw pi-list',
          children: processusItem.Procedures.map((procedureItem: any) => {
            const procedureNode: TreeNode = {
              key: procedureItem.ProcedureID.toString(),
              label: procedureItem.Procedure,
              data: procedureItem.Description,
              icon: 'pi pi-fw pi-clone',
              children: [
                // Section "Documents"
                {
                  key: `${procedureItem.ProcedureID}-documents`,
                  label: 'Documents',
                  data: 'Documents Folder',
                  icon: 'pi pi-fw pi-file',
                  children: procedureItem.Documents.map((documentItem: any) => ({
                    key: `${documentItem.DocumentID}`,
                    label: documentItem.Document,
                    data: {
                      key: `${documentItem.DocumentID}`,
                      label: documentItem.Document,
                      path: documentItem.DocumentPath,
                      Pilote : documentItem.Pilote,
                      CoPilote : documentItem.CoPilote,
                      fileName: documentItem.DocumentFileName,
                      fileExt : this.obtenirExtensionFichier(documentItem.DocumentFileName),
                      state :documentItem.state,
                      type : 'ProcDocument'
                   
                    },
                    icon: 'pi pi-fw pi-file',
                  })),
                },
                // Section "Objectifs"
              ],
            };
            return procedureNode;
          }),
        },
           {
             key: `${processusItem.ProcessusID}-process-documents`,
             label: 'Documents ',
             data: 'Process Documents Folder',
             icon: 'pi pi-fw pi-file',
             children: processusItem.ProcessDocuments.map((processDocItem: any) => ({
               key: `${processDocItem.ProcessDocID}`,
               label: processDocItem.ProcessDoc,
               data: {
                key: `${processDocItem.ProcessDocID}`,
                label: processDocItem.ProcessDoc,
                path: processDocItem.ProcessDocPath,
                Pilote : processDocItem.Pilote,
                CoPilote : processDocItem.CoPilote,
                fileName: processDocItem.ProcessDocFileName,
                fileExt : this.obtenirExtensionFichier(processDocItem.ProcessDocFileName),
                processus :processusItem.Processus,
                state :processDocItem.state,
                type : 'ProcesDocument'     
              },
               icon: 'pi pi-fw pi-file',
             })),
           }, 
         ],
       };
   
       return processusNode;
     });
   }

   obtenirExtensionFichier(nomFichier: string): string {
    const segments = nomFichier.split('.');
    if (segments.length > 1) {
      // Si le nom de fichier a au moins une extension
      const extension = segments[segments.length - 1];
      return extension.toLowerCase(); // Renvoyer l'extension en minuscules si nécessaire
    } else {
      // Si le nom de fichier n'a pas d'extension
      return '';
    }
  }

    
    /* ----------------------- La fonction de suppression -----------------------*/
    DeleteAnProcedureDocuments(p: any) {
      Swal.fire({
          title: 'Suppression',
          html: `<b> Êtes-vous sûr de vouloir ce document :: </b></br>  ${p?.label} ?`,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          cancelButtonText: 'Annuler',
          confirmButtonColor: '#258662',
          cancelButtonColor: '#f50707',
          confirmButtonText: 'Valider',
      }).then((result: any) => {
          if (result?.value) {
              let body: any = {
                  ID: p?.key,
              };
              this.is_loading = true;
              this.delete = this.ProcDocuments_src
                  .DeleteAnProcedureDocuments(body)
                  .subscribe((r: any) => {
                      r = JSON.parse(r);
                      switch (r?.msg) {
                          case 'Supprimé':
                              this.generalService.errorSwal(
                                  'Procédure du Document supprimé !',
                                  2000,
                                  'success'
                              );
                              this.selectedNode=null;
                              this.libraryService.getProcessusData().subscribe((data) => {
                                this.processusData = this.formatData(data);
                              });
                             
                              break;
                          default:
                              this.generalService.errorSwal(r?.msg);
                              this.is_loading = false;
                              break;
                           
                      }
                  }); // end subscribe
          } // fin if result swal
      }); // fin then swal 
  }

  
    /* ----------------------- La fonction de statut -----------------------*/

    StatutAnProcedureDocuments(p: any) {
      Swal.fire({
          title: "Archiver le document",
          html: `<b>Voulez-vous archiver ce document :</b></br> ${p?.label} ?`,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          cancelButtonText: 'Annuler',
          confirmButtonColor: '#258662',
          cancelButtonColor: '#f50707',
          confirmButtonText: 'Archiver ',
      }).then((result: any) => {
          if (result?.value) {
              let body: any = {
                  "documentId": p?.key,
                  "newState": p?.data.state
              };
              this.is_loading = true;
              this.delete = this.ProcDocuments_src
                  .StatutAnProcedureDocuments(body)
                  .subscribe((r: any) => {
                      r = JSON.parse(r);
                      switch (r?.msg) {
                          case 'Modifié':
                              this.generalService.errorSwal(
                                  "L'état de Périmé a été mis à jour avec succès!",
                                  2000,
                                  'success'
                              );
                              this.libraryService.getProcessusData().subscribe((data) => {
                                this.processusData = this.formatData(data);
                              });
                              this.selectedNode = null;
                              break;
                          default:
                              this.generalService.errorSwal(r?.msg);
                              this.is_loading = false;
                              break;
                      }
                  });
          }
      });
  }



    /* ----------------------- La fonction de suppression -----------------------*/
    DeleteAnProcessusDocuments(p: any) {
      Swal.fire({
          title: 'Suppression',
          html: `<b> Êtes-vous sûr de vouloir Processus du Document: </b></br>  ${p?.label} ?`,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          cancelButtonText: 'Annuler',
          confirmButtonColor: '#258662',
          cancelButtonColor: '#f50707',
          confirmButtonText: 'Valider',
      }).then((result: any) => {
          if (result?.value) {
              let body: any = {
                  ID: p?.key,
              };
              this.is_loading = true;
              this.delete = this.ProcesDocuments_src
                  .DeleteAnProcessusDocuments(body)
                  .subscribe((r: any) => {
                      r = JSON.parse(r);
                      switch (r?.msg) {
                          case 'Supprimé':
                              this.generalService.errorSwal(
                                  'Processus du Document supprimé !',
                                  2000,
                                  'success'
                              );
                              this.selectedNode = null;
                              this.libraryService.getProcessusData().subscribe((data) => {
                                this.processusData = this.formatData(data);
                              });
                           
                              break;
                          default:
                              this.generalService.errorSwal(r?.msg);
                              this.is_loading = false;
                              break;
                      }
                  }); // end subscribe
          } // fin if result swal
      }); // fin then swal 
  }


  /* ----------------------- La fonction de statut -----------------------*/

  StatutAnProcessusDocuments(p: any) {
      Swal.fire({
          title: "Archiver le document",
          html: `<b>Voulez-vous archiver ce document :</b></br> ${p?.label} ?`,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          cancelButtonText: 'Annuler',
          confirmButtonColor: '#258662',
          cancelButtonColor: '#f50707',
          confirmButtonText: 'Archiver',
      }).then((result: any) => {
          if (result?.value) {
              let body: any = {
                  "documentId": p?.key,
                  "newState": p?.data.state
              };
              this.is_loading = true;
              this.delete = this.ProcesDocuments_src
                  .StatutAnProcessusDocuments(body)
                  .subscribe((r: any) => {
                      r = JSON.parse(r);
                      switch (r?.msg) {
                          case 'Modifié':
                            this.generalService.errorSwal(
                              "L'état de Périmé a été mis à jour avec succès!",
                              2000,
                              'success'
                          );
                          this.selectedNode = null;
                            this.libraryService.getProcessusData().subscribe((data) => {
                              this.processusData = this.formatData(data);
                            });
                          
                             
                              break;
                          default:
                              this.generalService.errorSwal(r?.msg);
                              this.is_loading = false;
                              break;
                      }
                  });
          }
      });
  }




     /* -------------------------------------------------------------------------- */
    /*                            Ajout ou modification                           */
    /* -------------------------------------------------------------------------- */

    ShowFormulaire(action: any, data_selected_Dp: any = null) {
      if (action == 'Ajouté') {
          setTimeout(() => {
              this.if_show_ajouter = true;
          }, 100);
      } else if (action == 'modifier_proces') {
          this.data_selected_Dp = data_selected_Dp;
          console.log(this.data_selected_Dp);
          this.Header_info = `Modification du document: `;
          setTimeout(() => {
            this.if_show_proces_modifier = true;
          }, 100);
      }
      else if (action == 'modifier_proc') {
        this.data_selected_Dp = data_selected_Dp;
        console.log(this.data_selected_Dp);
        this.Header_info = `Modification du document: `;
        setTimeout(() => {
          this.if_show_proc_modifier = true;
        }, 100);
    }
  }

    /* -------------------------------------------------------------------------- */
  /*                           telecharger document                              */
  /* -------------------------------------------------------------------------- */
  
  downloadDocumentProce(procDocumentId: any ,fileExtension : any) {
    console.log('produre',procDocumentId)
    this.ProcDocuments_src.DownloadProcDocument(procDocumentId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Document Procédure.${fileExtension}`; // Remplacez par le nom souhaité du fichier
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

   /* -------------------------------------------------------------------------- */
    /*                           telecharger document                              */
    /* -------------------------------------------------------------------------- */
    downloadDocumentProcessus(procesDocumentId: number ,fileExtension:any) {
      this.ProcesDocuments_src.DownloadProcesDocument(procesDocumentId).subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Document Processus.${fileExtension}`; // Remplacez par le nom souhaité du fichier
          a.click();
          window.URL.revokeObjectURL(url);
      });
  }

  /* ---------------- Férmeture du popup Ajout des utilisateurs ---------------- */
  CloseAjouter(event: boolean) {
      if (!event) {
          this.if_show_ajouter = false;   
      } else {
          this.if_show_ajouter = false;
          this.libraryService.getProcessusData().subscribe((data) => {
            this.processusData = this.formatData(data);
          });
          this.selectedNode = null;
      }
  }

  /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
  CloseUpdate(event: boolean) {
      if (!event) {
          this.if_show_proces_modifier = false;
          this.if_show_proc_modifier = false;
      } else {
          this. if_show_proces_modifier = false;
          this.if_show_proc_modifier = false;
          this.libraryService.getProcessusData().subscribe((data) => {
            this.processusData = this.formatData(data);
          });
          this.selectedNode = null;
      }
  }
 
}

