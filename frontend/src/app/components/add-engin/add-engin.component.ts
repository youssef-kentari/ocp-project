import { Component, OnInit } from '@angular/core';
import { EnginService } from '../../services/engin.service';
import { Engin } from '../../models/engin.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-engin',
    standalone:true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-engin.component.html',
    styleUrls: ['./add-engin.component.css']
})
export class AddEnginComponent implements OnInit {
  engin: any = {
    designation: '',
    type_engin: '',
    modele: '',
    date_mise_en_service: new Date()
  };
  submitted = false;

  constructor(private enginService: EnginService) { }

  ngOnInit(): void {
  }

  saveEngin(): void {
    const data = {
      designation: this.engin.designation,
      type_engin: this.engin.type_engin,
      modele: this.engin.modele,
      date_mise_en_service: this.engin.date_mise_en_service
    };

    this.enginService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        alert("l'engin est bien ajoute");
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newEngin(): void {
    this.submitted = false;
    this.engin = {
      designation: '',
      type_engin: '',
      modele: '',
      date_mise_en_service: new Date()
    };
  }
}