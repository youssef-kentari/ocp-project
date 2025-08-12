import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'power-bi',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './powerbi.component.html',
    styleUrl: './powerbi.component.css'
})
export class PowerBI implements OnInit {
    lastUpdatedDate = new Date();

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    activeReport: string = 'revisions';

    showReport(reportName: string): void {
        this.activeReport = reportName;
    }

}