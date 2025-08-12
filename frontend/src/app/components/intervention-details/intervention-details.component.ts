import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import { Intervention } from '../../models/intervention.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-intervention-details',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './intervention-details.component.html'
})
export class InterventionDetailsComponent implements OnInit {
    @Input() viewMode = false;
    @Input() currentIntervention: Intervention | any;
    @Output() refreshList: EventEmitter<any> = new EventEmitter();
    message = '';
    statusOptions = ['Planifié', 'En cours', 'Terminé', 'Annulé'];

    constructor(private interventionService: InterventionService ,private router: Router) { }

    ngOnInit(): void {
        this.message = '';
    }

    ngOnChanges(): void {
        this.message = '';
    }

    updateIntervention(): void {
        if (this.currentIntervention?.intervention_id) {
            const data: any = {
                date_planifiee: this.currentIntervention.date_planifiee,
                date_livraison: this.currentIntervention.date_livraison,
                statut: this.currentIntervention.statut,
                responsable: this.currentIntervention.responsable,
                type_intervention: this.currentIntervention.type_intervention,
                notes: this.currentIntervention.notes
            };

            this.interventionService.update(this.currentIntervention.intervention_id, data)
                .subscribe({
                    next: () => {
                        this.message = 'The intervention was updated successfully!';
                    },
                    error: (e) => console.error(e)
                });
        }
    }

    updateStatus(newStatus: string): void {
        if (this.currentIntervention?.intervention_id) {
            this.interventionService.updateStatus(this.currentIntervention.intervention_id, newStatus)
                .subscribe({
                    next: () => {
                        if (this.currentIntervention) {
                            this.currentIntervention.statut = newStatus;
                        }
                        this.message = 'The status was updated successfully!';
                    },
                    error: (e) => console.error(e)
                });
        }
    }

    editIntervention(): void {
        this.router.navigate([`/intervention/edit/${this.currentIntervention?.intervention_id}`]);
    }

    deleteIntervention(): void {
        if (this.currentIntervention?.intervention_id) {
            if (confirm('Are you sure you want to delete this intervention?')) {
                this.interventionService.delete(this.currentIntervention.intervention_id)
                    .subscribe({
                        next: () => {
                            this.refreshList.emit();
                            this.message = 'The intervention was deleted successfully!';
                        },
                        error: (e) => console.error(e)
                    });
            }
        }
    }
}