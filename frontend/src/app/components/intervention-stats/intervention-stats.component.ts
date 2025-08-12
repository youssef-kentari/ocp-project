import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import {
    StatusStats,
    TimelineStats,
    ResponsibleWorkload,
    TypeDistribution
} from '../../models/intervention.model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-intervention-stats',
    imports: [
        FormsModule,
        CommonModule,
        NgChartsModule,
    ],
    templateUrl: './intervention-stats.component.html'
})
export class InterventionStatsComponent implements OnInit {
    statusStats: StatusStats[] = [];
    timelineStats: TimelineStats[] = [];
    averageCompletionDays = 0;
    responsibleWorkload: ResponsibleWorkload[] = [];
    typesDistribution: TypeDistribution[] = [];
    loading = false;
    timelinePeriod = 'month';

    // Charts configuration
    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: { legend: { position: 'top' } }
    };
    public pieChartType: ChartType = 'pie';
    public pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    };
    public lineChartType: ChartType = 'line';
    public lineChartData: ChartData<'line'> = { labels: [], datasets: [] };

    constructor(private interventionService: InterventionService) { }

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.loading = true;

        this.interventionService.getStatusStats().subscribe({
            next: (data) => {
                this.statusStats = data;
                this.updateStatusChart();
            },
            error: (e) => console.error(e)
        });

        this.interventionService.getTimelineStats(this.timelinePeriod).subscribe({
            next: (data) => {
                this.timelineStats = data;
                this.updateTimelineChart();
            },
            error: (e) => console.error(e)
        });

        this.interventionService.getAverageCompletionTime().subscribe({
            next: (data) => {
                this.averageCompletionDays = data.average_completion_days;
            },
            error: (e) => console.error(e)
        });

        this.interventionService.getResponsibleWorkload().subscribe({
            next: (data) => {
                this.responsibleWorkload = data;
            },
            error: (e) => console.error(e)
        });

        this.interventionService.getTypesDistribution().subscribe({
            next: (data) => {
                this.typesDistribution = data;
                this.updateTypesChart();
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            }
        });
    }

    updateStatusChart(): void {
        this.barChartData = {
            labels: this.statusStats.map(s => s.statut),
            datasets: [{
                data: this.statusStats.map(s => s.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)'                ]
            }]
        };
    }

    updateTimelineChart(): void {
        this.lineChartData = {
            labels: this.timelineStats.map(t => t.period),
            datasets: [{
                data: this.timelineStats.map(t => t.count),
                label: 'Interventions',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        };
    }

    updateTypesChart(): void {
        this.pieChartData = {
            labels: this.typesDistribution.map(t => t.type_intervention),
            datasets: [{
                data: this.typesDistribution.map(t => t.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ]
            }]
        };
    }

    onPeriodChange(): void {
        this.loadStats();
    }
}