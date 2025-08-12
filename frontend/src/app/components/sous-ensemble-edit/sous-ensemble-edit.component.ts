import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { EnginService } from '../../services/engin.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sous-ensemble-edit',
    standalone: true,
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,

    ],
    templateUrl: './sous-ensemble-edit.component.html',
    styleUrl: './sous-ensemble-edit.component.css'
})
export class SousEnsembleEditComponent implements OnInit {
    sousEnsembleForm: FormGroup;
    engins: any = [];
    isLoading = false;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private sousEnsembleService: SousEnsembleService,
        private enginService: EnginService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.sousEnsembleForm = this.fb.group({
            engin_id: ['', Validators.required],
            designation: ['', Validators.required],
            type_sous_ensemble: [''],
            quantite_installee: [0, [Validators.min(0)]],
            sous_ensemble_relais_disponible: [0, [Validators.min(0)]],
            sous_ensemble_en_attente_revision: [0, [Validators.min(0)]],
            sous_ensemble_encours_revision: [0, [Validators.min(0)]],
            corps_sous_ensembles_disponibles: [0, [Validators.min(0)]],
            prix_sous_ensemble_neuf_DH: [0, [Validators.min(0)]],
            duree_revision_jours: [0, [Validators.min(0)]],
            cout_revision_MAD: [0, [Validators.min(0)]],
            heures_marche_actuel: [0, [Validators.min(0)]],
            heures_marche_cible: [0, [Validators.min(0)]],
            heures_marche_annee: [0, [Validators.min(0)]],
            nombre_revisions_avant_reforme: [0, [Validators.min(0)]],
            fournisseur: [''],
            delai_livraison_apres_commande_jours: [''],
            mode_gestion_actuel: [''],
            besoin_global_annuel: [0, [Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadEngins();
        this.loadSousEnsemble();
    }

    loadEngins(): void {
        this.isLoading = true;
        this.enginService.getAll().subscribe({
            next: (engins) => {
                this.engins = engins.map(e => e.engin_id);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading engins:', error);
                this.isLoading = false;
                this.snackBar.open('Failed to load engins', 'Close', { duration: 3000 });
            }
        });
    }

    loadSousEnsemble(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isLoading = true;
            this.sousEnsembleService.getById(+id).subscribe({
                next: (sousEnsemble) => {
                    this.sousEnsembleForm.patchValue(sousEnsemble);
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error loading sous-ensemble:', error);
                    this.isLoading = false;
                    this.snackBar.open('Failed to load sous-ensemble', 'Close', { duration: 3000 });
                }
            });
        }
    }

    onSubmit(): void {
        if (this.sousEnsembleForm.invalid) {
            this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
            return;
        }

        this.isSubmitting = true;
        const id = this.route.snapshot.paramMap.get('id');
        const sousEnsembleData = this.sousEnsembleForm.value;
        console.log(sousEnsembleData);

        if (id) {
            this.sousEnsembleService.update(+id, sousEnsembleData).subscribe({
                next: () => {
                    this.isSubmitting = false;
                    this.snackBar.open('Sous-ensemble updated successfully', 'Close', { duration: 3000 });
                    this.router.navigate(['/sous-ensembles']);
                },
                error: (error) => {
                    console.error('Error updating sous-ensemble:', error);
                    this.isSubmitting = false;
                    this.snackBar.open('Failed to update sous-ensemble', 'Close', { duration: 3000 });
                }
            });
        }
    }

    annuler(){
        this.router.navigate(['/sous-ensembles'])
    }
}