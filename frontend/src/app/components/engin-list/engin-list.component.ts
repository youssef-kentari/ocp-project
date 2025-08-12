import { Component, OnInit } from '@angular/core';
import { EnginService } from '../../services/engin.service';
import { Engin } from '../../models/engin.model';
import { FormsModule } from '@angular/forms';
import { EnginDetailsComponent } from '../engin-details/engin-details.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-engin-list',
    imports: [EnginDetailsComponent, FormsModule, CommonModule],
    templateUrl: './engin-list.component.html'
})
export class EnginListComponent implements OnInit {
  engins: Engin[] = [];
  activeEngin : boolean = false;
  currentEngin: Engin = {} as Engin;
  currentIndex = -1;
  designation = '';

  constructor(private enginService: EnginService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveEngins();
  }

  retrieveEngins(): void {
    this.enginService.getAll().subscribe({
      next: (data) => {
        this.engins = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveEngins();
    this.currentEngin = {} as Engin;
    this.currentIndex = -1;
  }

  setActiveEngin(engin: Engin, index: number): void {
    this.currentEngin = engin;
    this.activeEngin = true;
    this.currentIndex = index;
  }

  toAddPage(){
    this.router.navigate(["/engin/add"]);
  }

  removeAllEngins(): void {
    if (confirm('Are you sure you want to delete all engins?')) {
      this.engins.forEach(engin => {
        if (engin.engin_id) {
          this.enginService.delete(engin.engin_id).subscribe({
            next: () => {
              this.refreshList();
            },
            error: (e) => console.error(e)
          });
        }
      });
    }
  }

  searchDesignation(): void {
    this.currentEngin = {} as Engin;
    this.currentIndex = -1;

    // This is a client-side filter - you might want to implement server-side search
    this.enginService.getAll().subscribe({
      next: (data) => {
        this.engins = data.filter(engin => 
          engin.designation.toLowerCase().includes(this.designation.toLowerCase())
        );
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}