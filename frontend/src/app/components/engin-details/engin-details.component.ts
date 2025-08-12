import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Engin } from '../../models/engin.model';
import { EnginService } from '../../services/engin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-engin-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './engin-details.component.html',
    styleUrls: ['./engin-details.component.css']
})
export class EnginDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentEngin: Engin = {
    designation: '',
    type_engin: '',
    modele: '',
    date_mise_en_service: new Date()
  };
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  message = '';

  constructor(private enginService: EnginService, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
  }

  updateEngin(id:any): void {
    this.router.navigate([`/engin/edit/${id}`]);
  }

  deleteEngin(): void {
    if (this.currentEngin.engin_id) {
      if (confirm('Are you sure you want to delete this engin?')) {
        this.enginService.delete(this.currentEngin.engin_id).subscribe({
          next: () => {
            this.refreshList.emit();
            this.message = 'The engin was deleted successfully!';
          },
          error: (e) => console.error(e)
        });
      }
    }
  }
}