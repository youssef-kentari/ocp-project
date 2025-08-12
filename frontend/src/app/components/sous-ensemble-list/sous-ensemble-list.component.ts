import { Component, OnInit } from '@angular/core';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { SousEnsemble } from '../../models/sous-ensemble.model';
import { FormsModule } from '@angular/forms';
import { SousEnsembleDetailsComponent } from '../sous-ensemble-details/sous-ensemble-details.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sous-ensemble-list',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        SousEnsembleDetailsComponent
    ],
    templateUrl: './sous-ensemble-list.component.html'
})
export class SousEnsembleListComponent implements OnInit {
  sousEnsembles: SousEnsemble[] = [];
  showDetails: boolean = false;
  currentSousEnsemble: SousEnsemble | any ;
  currentIndex = -1;
  designation = '';
  enginId = '';

  constructor(private sousEnsembleService: SousEnsembleService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveSousEnsembles();
  }

  retrieveSousEnsembles(): void {
    this.sousEnsembleService.getAll().subscribe({
      next: (data) => {
        this.sousEnsembles = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveByEngin(): void {
    if (this.enginId) {
      this.sousEnsembleService.getByEnginId(this.enginId).subscribe({
        next: (data) => {
          this.sousEnsembles = data;
        },
        error: (e) => console.error(e)
      });
    }
  }

  navigateToAddPage(){
    this.router.navigate(['/sous-ensemble/add']);
  }

  refreshList(): void {
    this.retrieveSousEnsembles();
    this.currentSousEnsemble = null;
    this.currentIndex = -1;
  }

  setActiveSousEnsemble(sousEnsemble: SousEnsemble, index: number): void {
    this.currentSousEnsemble = sousEnsemble;
    this.showDetails = true;
    this.currentIndex = index;
  }

  searchDesignation(): void {
    this.currentSousEnsemble = null;
    this.currentIndex = -1;

    this.sousEnsembleService.getAll().subscribe({
      next: (data) => {
        this.sousEnsembles = data.filter(se => 
          se.designation.toLowerCase().includes(this.designation.toLowerCase())
        );
      },
      error: (e) => console.error(e)
    });
  }
}