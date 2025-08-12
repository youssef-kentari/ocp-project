import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterventionService } from '../../services/intervention.service';
import { Intervention } from '../../models/intervention.model';
import { CommonModule } from '@angular/common';
import { OperationService } from '../../services/operation.service';
import { ResponsableService } from '../../services/responsable.service';
import { switchMap, tap, finalize, catchError, EMPTY, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SousEnsembleService } from '../../services/sous-ensemble.service';

@Component({
    selector: 'app-add-intervention',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './add-intervention.component.html'
})
export class AddInterventionComponent implements OnInit {
    interventionForm: FormGroup;
    descriptions: string[] = [];
    responsables: string[] = [];
    types: string[] = [];
    index!: number;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private interventionService: InterventionService,
        private sousEnsembleService: SousEnsembleService,
        private operationService: OperationService,
        private route: ActivatedRoute,
        private responsableService: ResponsableService
    ) {
        this.interventionForm = this.fb.group({
            description: ['', Validators.required],
            date_planifiee: [null, Validators.required],
            date_livraison: [null],
            statut: ['Planifie', Validators.required],
            responsable: ['', Validators.required],
            type_intervention: ['', Validators.required],
            notes: ['']
        });

        this.index = Number(this.route.snapshot.paramMap.get('index'));
    }

    ngOnInit(): void {
        this.loadSelectOptions();
    }

    loadSelectOptions(): void {
        this.isLoading = true;

        const requests = [
            this.responsableService.getAllRespo().pipe(
                tap(res => this.responsables = res.map((r: any) => r.nom)),
                catchError(err => {
                    return EMPTY;
                })
            ),
            this.interventionService.getTypesDistribution().pipe(
                tap(res => this.types = res.map((t: any) => t.type_intervention)),
                catchError(err => {
                    return EMPTY;
                })
            ),
            this.operationService.getAllDescription().pipe(
                tap(res => this.descriptions = res.map((d: any) => d.description)),
                catchError(err => {
                    return EMPTY;
                })
            )
        ];

        forkJoin(requests).pipe(
            finalize(() => this.isLoading = false)
        ).subscribe();
    }

    onSubmit(): void {
        if (this.interventionForm.invalid) {
            this.markFormGroupTouched(this.interventionForm);
            return;
        }

        this.isLoading = true;
        const formValue = this.interventionForm.value;

        this.operationService.getIdByDescription(formValue.description).pipe(
            switchMap(operationData => {
                const intervention: Intervention = {
                    ...formValue,
                    operation_id: operationData.operation_id
                };

                return this.operationService.getSEbyOperation(operationData.operation_id).pipe(
                    switchMap(seData => this.sousEnsembleService.getById(seData.sous_ensemble_id)),
                    switchMap((sousEnsemble: any) => {
                        sousEnsemble.heures_marche_actuel = 0;
                        return this.sousEnsembleService.update(sousEnsemble.sous_ensemble_id, sousEnsemble);
                    }),
                    switchMap(() => this.interventionService.create(intervention)),
                    switchMap(createdIntervention =>
                        this.responsableService.getEmailByName(intervention.responsable).pipe(
                            switchMap(responsableData => {
                                const emailDetails = {
                                    email: responsableData.email,
                                    message: this.generateEmailMessage(intervention, operationData.description)
                                };
                                return this.interventionService.sendEmail(emailDetails);
                            })
                        )
                    ),
                    tap(() => {
                        this.resetForm();
                        this.router.navigate(['/interventions']);
                    }),
                    catchError(err => {
                        console.error('Error:', err);
                        // Ajoutez ici une notification à l'utilisateur
                        return EMPTY;
                    }),
                    finalize(() => this.isLoading = false)
                );
            })
        ).subscribe();
    }

    backTo() {
        this.router.navigate(['/interventions']);
    }

    private generateEmailMessage(intervention: Intervention, operationDescription: string): string {
        return `
<p>
  Cher(e) ${intervention.responsable},
</p>

<p>
  Vous avez été assigné(e) comme responsable de l'intervention suivante :
</p>

<ul>
  <li><strong>Opération:</strong>  ${intervention.notes || 'Aucune note fournie'}</li>
  <li><strong>Type d'intervention:</strong> ${intervention.type_intervention}</li>
  <li><strong>Date planifiée:</strong> ${intervention.date_planifiee}</li>
  <li><strong>Statut:</strong> ${intervention.statut}</li>
</ul>

<p>
  Cordialement,<br>
  L'équipe de maintenance
</p>
`;
    }

    private resetForm(): void {
        this.interventionForm.reset({
            statut: 'Planifie',
            date_planifiee: null,
            date_livraison: null,
            notes: ''
        });
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
}