import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsableService } from '../../services/responsable.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-responsable-detail',
  standalone:true,
  imports:[
    MatCardModule,
    CommonModule
  ],
  templateUrl: './responsable-detail.component.html',
  styleUrls: ['./responsable-detail.component.css']
})
export class ResponsableDetailComponent implements OnInit {
  responsable: any;

  constructor(
    private route: ActivatedRoute,
    private responsableService: ResponsableService
  ) { }

  ngOnInit(): void {
    const nom = this.route.snapshot.paramMap.get('nom');
    if (nom) {
      this.responsableService.getEmailByName(nom).subscribe(
        (data:any) => this.responsable = data,
        (error:any) => console.error('Error fetching responsable details', error)
      );
    }
  }
}