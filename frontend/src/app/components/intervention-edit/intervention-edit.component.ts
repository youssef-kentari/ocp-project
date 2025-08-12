import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule, DatePipe, formatCurrency } from '@angular/common';
import { InterventionService } from '../../services/intervention.service';
import { Intervention } from '../../models/intervention.model';
import { OperationService } from '../../services/operation.service';
import { map, Observable } from 'rxjs';
import { ResponsableService } from '../../services/responsable.service';

@Component({
    selector: 'app-intervention-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './intervention-edit.component.html',
    styleUrl: './intervention-edit.component.css',
    providers: [DatePipe]
})
export class InterventionEditComponent implements OnInit {
    interventionForm: FormGroup;
    interventionId: number = 0;
    operation_id: number = 0;
    statuts: any[] = [];
    descriptions: string[] = [];
    responsables: any[] = [];
    types: any[] = [];
    defaultDescription?: string;

    isSubmitting = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private operationService: OperationService,
        private interventionService: InterventionService,
        private datePipe: DatePipe,
        private responsableService: ResponsableService
    ) {
        this.interventionForm = this.fb.group({
            operationDescription: ['', Validators.required],
            date_planifiee: ['', Validators.required],
            date_livraison: [''],
            statut: ['', Validators.required],
            responsable: [''],
            type_intervention: [''],
            notes: ['']
        });
    }

    ngOnInit(): void {
        this.interventionId = +this.route.snapshot.paramMap.get('id')!;
        this.loadSelectOptions();
        this.loadIntervention();
    }


    loadSelectOptions(): void {
        this.interventionService.getAllStatus().subscribe(res => {
            this.statuts = res.map((s: any) => s.statut);
        });

        this.responsableService.getAllRespo().subscribe(res => {
            this.responsables = res.map((r: any) => r.nom);
        });

        this.interventionService.getTypesDistribution().subscribe(res => {
            this.types = res.map((t: any) => t.type_intervention);
        });

        this.operationService.getAllDescription().subscribe(res => {
            this.descriptions = res.map((d: any) => d.description);
        })
    }


    loadIntervention(): void {
        this.interventionService.getById(this.interventionId).subscribe({
            next: (intervention) => {
                this.operationService.getDescriptionById(intervention.operation_id).subscribe({
                    next: (data) => {
                        const formattedIntervention = {
                            ...intervention,
                            operationDescription: data.description,
                            date_planifiee: this.datePipe.transform(intervention.date_planifiee, 'yyyy-MM-dd'),
                            date_livraison: intervention.date_livraison ? this.datePipe.transform(intervention.date_livraison, 'yyyy-MM-dd') : null,
                        };
                        this.interventionForm.patchValue(formattedIntervention);
                    },
                    error: (e) => console.error('Failed to load operation description', e)
                });
            },
            error: (err) => {
                this.errorMessage = 'Failed to load intervention details';
                console.error(err);
            }
        });
    }

    getIdByDescription(description: string): Observable<number> {
        return this.operationService.getIdByDescription(description).pipe(
            map(data => data.operation_id)
        );
    }

    onSubmit(): void {
        if (this.interventionForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        const formValue = this.interventionForm.value;

        this.getIdByDescription(formValue.operationDescription).subscribe({
            next: (operation_id: number) => {
                // Build the update object without operationDescription
                const updatedIntervention: Intervention = {
                    // explicitly map all needed properties except operationDescription
                    date_planifiee: formValue.date_planifiee,
                    date_livraison: formValue.date_livraison,
                    statut: formValue.statut,
                    responsable: formValue.responsable,
                    type_intervention: formValue.type_intervention,
                    notes: formValue.notes,
                    operation_id: operation_id
                };

                this.interventionService.update(this.interventionId, updatedIntervention).subscribe({
                    next: () => {
                        alert('updated successfully');
                        this.router.navigate(['/interventions']);
                    },
                    error: (err) => {
                        this.isSubmitting = false;
                        this.errorMessage = 'Failed to update intervention';
                        console.error(err);
                    }
                });
            },
            error: (err) => {
                this.isSubmitting = false;
                this.errorMessage = 'Failed to get operation ID';
                console.error(err);
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/interventions']);
    }
}