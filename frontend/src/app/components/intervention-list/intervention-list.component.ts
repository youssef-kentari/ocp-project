import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import { Intervention } from '../../models/intervention.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InterventionDetailsComponent } from '../intervention-details/intervention-details.component';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { OperationService } from '../../services/operation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intervention-list',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        InterventionDetailsComponent
    ],
    templateUrl: './intervention-list.component.html'
})
export class InterventionListComponent implements OnInit {
    interventions: Intervention[] = [];

    designations: any;
    selectedDesignation: string = '';

    responsables: any;
    selectedResponsable: string = '';

    operations: any;
    selectedOperation: string = '';

    status: any;
    selectedStatut: string = '';

    currentIntervention: Intervention | null = null;
    currentIndex = -1;
    operationId = '';
    loading = false;

    constructor(
        private interventionService: InterventionService,
        private sousEnsembleService: SousEnsembleService,
        private operationService: OperationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.retrieveInterventions();
    }

    retrieveInterventions(): void {
        this.loading = true;
        this.interventionService.getAll().subscribe({
            next: (data) => {
                this.interventions = data;
                this.getAllStatus();
                this.getAllDesignation();
                this.getAllOperations();
                this.getAllResponsable();
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            }
        });
    }

    resetFilters() {
        this.selectedDesignation = '';
        this.selectedOperation = '';
        this.selectedResponsable = '';
        this.selectedStatut = '';
    }

    retrieveByOperation(): void {
        if (this.operationId) {
            this.loading = true;
            this.interventionService.getByOperationId(+this.operationId).subscribe({
                next: (data) => {
                    this.interventions = data;
                    this.loading = false;
                },
                error: (e) => {
                    console.error(e);
                    this.loading = false;
                }
            });
        }
    }

    refreshList(): void {
        this.retrieveInterventions();
        this.currentIntervention = null;
        this.currentIndex = -1;
    }

    getAllStatus(): void {
        this.interventionService.getAllStatus().subscribe({
            next: (data) => {
                this.status = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    navigateToAddPage(){
        this.router.navigate(['/intervention/add']);
    }

    getAllResponsable(): void {
        this.interventionService.getAllResponsable().subscribe({
            next: (data) => {
                this.responsables = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getAllDesignation(): void {
        this.sousEnsembleService.getAllDesignations().subscribe({
            next: (data) => {
                this.designations = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getAllOperations(): void {
        this.operationService.getAllOperationsType().subscribe({
            next: (data) => {
                this.operations = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getInterventionByStatus(statut: string): void {
        this.interventionService.getInterventionByStatus(statut).subscribe({
            next: (data) => {
                this.interventions = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getInterventionByResponsable(respo: string): void {
        this.interventionService.getInterventionByResponsable(respo).subscribe({
            next: (data) => {
                this.interventions = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getInterventionBySE(designation: string): void {
        this.interventionService.getInterventionBySE(designation).subscribe({
            next: (data) => {
                this.interventions = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    getInterventionByOperationType(operation: string): void {
        this.interventionService.getInterventionByOperationType(operation).subscribe({
            next: (data) => {
                this.interventions = data;
            },
            error: (e) => {
                console.error(e);
            }
        });
    }

    setActiveIntervention(intervention: Intervention, index: number): void {
        this.currentIntervention = intervention;
        this.currentIndex = index;
    }
}