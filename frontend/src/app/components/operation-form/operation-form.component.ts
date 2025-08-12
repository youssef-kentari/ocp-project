import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OperationService } from '../../services/operation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operation-form',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css']
})
export class OperationFormComponent implements OnInit {
  operationForm: FormGroup;
  isEditMode = false;
  operationId: number | null = null;
  operationTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.operationForm = this.fb.group({
      sous_ensemble_id: ['', Validators.required],
      type_operation: ['', Validators.required],
      description: ['', Validators.required],
      atelier: ['']
    });
  }

  ngOnInit(): void {
    this.loadOperationTypes();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.operationId = +params['id'];
        this.loadOperationData(this.operationId);
      }
    });
  }

  loadOperationTypes(): void {
    this.operationService.getAllOperationsType().subscribe(
      (types: string[]) => {
        this.operationTypes = types.map((t:any)=> t.type_operation);
      },
      (error:any) => {
        console.error('Error fetching operation types:', error);
      }
    );
  }

  loadOperationData(id: number): void {
    this.operationService.getById(id).subscribe(
      (operation: any) => {
        this.operationForm.patchValue(operation);
      },
      (error:any) => {
        console.error('Error fetching operation:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.operationForm.valid) {
      const operationData = this.operationForm.value;
      
      if (this.isEditMode && this.operationId) {
        this.operationService.update(this.operationId, operationData).subscribe(
          () => {
            this.router.navigate(['/operations']);
          },
          (error:any) => {
            console.error('Error updating operation:', error);
          }
        );
      } else {
        this.operationService.create(operationData).subscribe(
          () => {
            this.router.navigate(['/operations']);
          },
          (error:any) => {
            console.error('Error creating operation:', error);
          }
        );
      }
    }
  }
}