import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OperationService } from '../../services/operation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-operation-list',
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {
  operations: any[] = [];
  filteredOperations: any[] = [];
  searchTerm: string = '';

  constructor(
    private operationService: OperationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOperations();
  }

  loadOperations(): void {
    this.operationService.getAll().subscribe(
      (data: any[]) => {
        this.operations = data;
        this.filteredOperations = [...this.operations];
      },
      (error:any) => {
        console.error('Error fetching operations:', error);
      }
    );
  }

  filterOperations(): void {
    if (!this.searchTerm) {
      this.filteredOperations = [...this.operations];
      return;
    }
    this.filteredOperations = this.operations.filter(op =>
      op.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      op.type_operation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editOperation(id: number): void {
    this.router.navigate(['/operations/edit', id]);
  }

  deleteOperation(id: number): void {
    if (confirm('Are you sure you want to delete this operation?')) {
      this.operationService.delete(id).subscribe(
        () => {
          this.loadOperations();
        },
        (error:any) => {
          console.error('Error deleting operation:', error);
        }
      );
    }
  }
}