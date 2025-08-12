import { Component, Input, OnInit } from '@angular/core';
import { SousEnsembleService } from '../../services/sous-ensemble.service';
import { CommonModule, DatePipe } from '@angular/common';
import { SousEnsemble } from '../../models/sous-ensemble.model';
import { PlanningService } from '../../services/planing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-planning',
    standalone: true,
    imports: [
        CommonModule,
        DatePipe
    ],
    templateUrl: './planing.component.html',
    styleUrl: './planing.component.css'
})
export class PlanningComponent implements OnInit {
    planning: any[] = [];
    loading = true;
    error = '';

    constructor(private router: Router, private sousEnsembleService: SousEnsembleService) {
    }

    ngOnInit(): void {
        this.sousEnsembleService.getPlanning().subscribe(
            (data) => {
                this.planning = data;
                this.loading = false;
            },
            (err) => {
                this.error = 'Erreur lors du chargement du planning';
                this.loading = false;
                console.error(err);
            }
        );
    }


    navigateToAddIntervention() {
        this.router.navigate(['/intervention/add']);
    }

    getUrgencyColor(urgence: string): string {
        const urgency = urgence.toLowerCase();
        switch (urgency) {
            case 'haute': return '#dc3545'; // Bootstrap's danger color
            case 'moyenne': return '#ffc107'; // Bootstrap's warning color
            default: return '#6c757d'; // Bootstrap's secondary color
        }
    }
}