import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdreService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importcsv-ddp',
  templateUrl: './importcsv-ddp.component.html',
  styleUrls: ['./importcsv-ddp.component.scss']
})
export class ImportcsvDdpComponent {
  csvFormGroup: FormGroup;
  headerNames: string[] = [];
  fields: string[] = [];
  errors: string[] = [];
  file: any;
  is_loading: boolean = false;

  constructor(private fb: FormBuilder, private src_ods: OrdreService, private http: HttpClient) { }

  ngOnInit() {
    this.csvFormGroup = this.fb.group({});
  }

  onFileChange(event: any) {
    this.is_loading = true
    const file = event.target.files[0];
    this.file = file;
    this.src_ods.getHeaderNamesFromCSV(file).subscribe(
      (response: any) => {

        this.headerNames = response.headerNames.toString().split(";");
        this.fields = response.fields;

        for (const field of this.fields) {
          this.csvFormGroup.addControl(field, this.fb.control(null));
        }

        this.is_loading = false
      },
      error => {
        console.error(error);
      }
    );
  }
  
  onSubmit() {
    if (this.file) {
      this.errors = [];
      this.is_loading = true;
      var formData = new FormData();
      formData.append('file', this.file);
      formData.append('data', JSON.stringify(this.csvFormGroup.value));

      this.http.post(environment.API_BASE_URL_GENERAL + environment.api.ordreService.UploadFileAndData, formData).subscribe(
        (response: any) => {
          this.is_loading = false;
          this.errors = response;
        },
        error => {
          this.is_loading = false;
          console.error('Upload error:', error);
        }
      );
    }

  }
}
