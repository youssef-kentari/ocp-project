import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnginService } from '../../services/engin.service';
import { Engin } from '../../models/engin.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-engin',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './engin-edit.component.html',
  styleUrl: './engin-edit.component.css'
})
export class EditEnginComponent implements OnInit {
  enginId: any ;  
  enginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private enginService: EnginService, private route: ActivatedRoute) {
    this.enginId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.enginForm = this.fb.group({
      designation: ['', Validators.required],
      type_engin: ['', Validators.required],
      modele: ['', Validators.required],
      date_mise_en_service: ['', Validators.required]
    });

    this.loadEngin();
  }

  loadEngin(): void {
    this.loading = true;
    this.enginService.getById(this.enginId).subscribe({
      next: (data) => {
        this.enginForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de l\'engin';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.enginForm.invalid) return;

    this.loading = true;
    const engin: any = this.enginForm.value;
    this.enginService.update(this.enginId, engin).subscribe({
      next: () => {
        this.loading = false;
        alert('Engin mis à jour avec succès');
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la mise à jour';
        this.loading = false;
      }
    });
  }
}
