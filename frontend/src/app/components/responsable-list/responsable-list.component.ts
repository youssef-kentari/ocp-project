import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ResponsableService } from '../../services/responsable.service';
import { ResponsableFormComponent } from '../responsable-form/responsable-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsable-list',
  standalone:true,
  imports:[
    MatTableModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.css']
})
export class ResponsableListComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private responsableService: ResponsableService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadResponsables();
  }

  loadResponsables(): void {
    this.responsableService.getAllRespo().subscribe(
      (data: any) => this.dataSource.data = data,
      (error:any) => console.error('Error fetching responsables', error)
    );
  }

  openForm(responsable?: any): void {
    const dialogRef = this.dialog.open(ResponsableFormComponent, {
      width: '600px',
      data: responsable ? { ...responsable } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadResponsables();
    });
  }

  deleteResponsable(nom: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Confirm Delete', message: `Are you sure you want to delete ${nom}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.responsableService.delete(nom).subscribe(
          () => this.loadResponsables(),
          (error: any) => console.error('Error deleting responsable', error)
        );
      }
    });
  }
}