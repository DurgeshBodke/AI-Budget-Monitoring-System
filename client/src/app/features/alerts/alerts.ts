import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AlertService } from '../../core/services/alert';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css'
})
export class Alerts implements OnInit {

  private service = inject(AlertService);

  private cdr = inject(ChangeDetectorRef);

  alerts:any[]=[];

  filteredAlerts:any[]=[];

  search='';

  criticalCount=0;

  highCount=0;

  mediumCount=0;

  ngOnInit():void{

    this.loadAlerts();

  }

  loadAlerts(){

    this.service.getAlerts().subscribe({

      next:(res:any)=>{

        this.alerts=res.alerts||[];

        this.filteredAlerts=[...this.alerts];

        this.criticalCount=this.alerts.filter(

          (a:any)=>a.severity==="Critical"

        ).length;

        this.highCount=this.alerts.filter(

          (a:any)=>a.severity==="High"

        ).length;

        this.mediumCount=this.alerts.filter(

          (a:any)=>a.severity==="Medium"

        ).length;

        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  filterAlerts(){

    if(!this.search.trim()){

      this.filteredAlerts=[...this.alerts];

      return;

    }

    const keyword=this.search.toLowerCase();

    this.filteredAlerts=this.alerts.filter((a:any)=>

      String(a.alertId).toLowerCase().includes(keyword) ||

      String(a.budgetId).toLowerCase().includes(keyword) ||

      String(a.departmentId).toLowerCase().includes(keyword) ||

      String(a.alertType).toLowerCase().includes(keyword) ||

      String(a.severity).toLowerCase().includes(keyword) ||

      String(a.message).toLowerCase().includes(keyword)

    );

  }

    deleteAlert(id: string){

    if(confirm("Delete Alert?")){

      this.service.deleteAlert(id).subscribe({

        next:()=>{

          alert("Alert Deleted Successfully");

          this.loadAlerts();

        },

        error:(err)=>{

          console.log(err);

          alert("Unable to delete alert.");

        }

      });

    }

  }

}