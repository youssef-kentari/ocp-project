import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { CommonModule } from '@angular/common';
import { EnginService } from '../../services/engin.service';

@Component({
  selector: 'app-add-sous-ensemble',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './add-sous-ensemble.component.html',
  styleUrl: './add-sous-ensemble.component.css'
})
export class AddSousEnsembleComponent implements OnInit {
  sousEnsembleForm: FormGroup;
  engins: any[] = [];
  isLoading = true;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private enginService: EnginService,
    private sousEnsembleService: SousEnsembleService,
    private router: Router
  ) {
    this.sousEnsembleForm = this.fb.group({
      engin_id: ['', Validators.required],
      designation: ['', Validators.required],
      type_sous_ensemble: [''],
      quantite_installee: [0],
      sous_ensemble_relais_disponible: [0],
      sous_ensemble_en_attente_revision: [0],
      sous_ensemble_encours_revision: [0],
      corps_sous_ensembles_disponibles: [0],
      prix_sous_ensemble_neuf_DH: [0],
      duree_revision_jours: [0],
      cout_revision_MAD: [0],
      heures_marche_actuel: [0],
      heures_marche_cible: [0],
      heures_marche_annee: [0],
      nombre_revisions_avant_reforme: [0],
      fournisseur: [''],
      delai_livraison_apres_commande_jours: [''],
      mode_gestion_actuel: [''],
      besoin_global_annuel: [0]
    });
  }

  ngOnInit(): void {
    this.loadEngins();
  }

  loadEngins(): void {
    this.enginService.getAll().subscribe(
      (data) => {
        this.engins = data.map(e=>e.engin_id);
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des engins', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.sousEnsembleForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.sousEnsembleService.create(this.sousEnsembleForm.value).subscribe(
      (response) => {
        console.log(response);
        this.isSubmitting = false;
        this.router.navigate(['/sous-ensembles']);
      },
      (error) => {
        console.error('Erreur lors de la création du sous-ensemble', error);
        this.isSubmitting = false;
      }
    );
  }

  annuler(): void {
    this.router.navigate(['/sous-ensembles']);
  }
}