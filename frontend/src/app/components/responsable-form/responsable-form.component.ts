import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResponsableService } from '../../services/responsable.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-responsable-form',
  standalone: true,
  imports:[
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule

  ],
  templateUrl: './responsable-form.component.html',
  styleUrls: ['./responsable-form.component.css']
})
export class ResponsableFormComponent implements OnInit {
  responsableForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private dialogRef: MatDialogRef<ResponsableFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    if (this.data) {
      this.isEditMode = true;
      this.responsableForm.patchValue(this.data);
    }
  }

  initForm(): void {
    this.responsableForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.responsableForm.valid) {
      const responsable = this.responsableForm.value;
      
      if (this.isEditMode) {
        this.responsableService.update(this.data.nom, responsable).subscribe(
          () => {
            alert("responsable est modifier avec success")
            this.dialogRef.close(true);
          },
          (error: any) => console.error('Error updating responsable', error)
        );
      } else {
        this.responsableService.create(responsable).subscribe(
          () => this.dialogRef.close(true),
          (error:any) => console.error('Error creating responsable', error)
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}