import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SousEnsemble } from '../../models/sous-ensemble.model';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sous-ensemble-details',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        NgChartsModule,
    ],
    templateUrl: './sous-ensemble-details.component.html',
    styleUrl: './sous-ensemble-details.component.css'
})
export class SousEnsembleDetailsComponent implements OnInit {
    @Input() viewMode = false;
    @Input() currentSousEnsemble: SousEnsemble = {
        sous_ensemble_id: 0,
        engin_id: '',
        designation: '',
        type_sous_ensemble: '',
        quantite_installee: 0,
        sous_ensemble_relais_disponible: 0,
        sous_ensemble_en_attente_revision: 0,
        sous_ensemble_encours_revision: 0,
        corps_sous_ensembles_disponibles: 0,
        prix_sous_ensemble_neuf_DH: 0,
        duree_revision_jours: 0,
        cout_revision_MAD: 0,
        heures_marche_actuel: 0,
        heures_marche_cible:0,
        heures_marche_annee:0,
        nombre_revisions_avant_reforme: 0,
        fournisseur: '',
        delai_livraison_apres_commande_jours: '',
        mode_gestion_actuel: '',
        besoin_global_annuel: 0
    };
    @Output() refreshList: EventEmitter<any> = new EventEmitter();
    message = '';

    constructor(
        private sousEnsembleService: SousEnsembleService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.message = '';
    }

    updateSousEnsemble(): void {
        if (this.currentSousEnsemble?.sous_ensemble_id) {
            this.router.navigate([`sous-ensemble/edit/${this.currentSousEnsemble.sous_ensemble_id}`])
        }
    }

    deleteSousEnsemble(): void {
        if (this.currentSousEnsemble?.sous_ensemble_id) {
            if (confirm('Are you sure you want to delete this sous-ensemble?')) {
                this.sousEnsembleService.delete(this.currentSousEnsemble.sous_ensemble_id)
                    .subscribe({
                        next: () => {
                            this.refreshList.emit();
                            this.message = 'The sous-ensemble was deleted successfully!';
                        },
                        error: (e) => console.error(e)
                    });
            }
        }
    }
}