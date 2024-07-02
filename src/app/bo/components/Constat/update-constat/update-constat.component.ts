/**import { Component, OnInit } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { ConstatService } from '../../../../services/AuditServices/constat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update-constat',
    templateUrl: './update-constat.component.html',
    styleUrls: ['./update-constat.component.scss']
})
export class UpdateConstatComponent implements OnInit {
    currentConstat = new ConstatModel();

    constructor(
        private constatService: ConstatService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.constatService.editConstat(id).subscribe(constat => {
                    this.currentConstat = constat;
                });
            }
        });
    }

    updateConstat() {
        this.constatService.updateConstat(this.currentConstat.id, this.currentConstat).subscribe(() => {
            this.router.navigate(['listconstat']);
        });
    }
}
**/
