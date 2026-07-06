
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router,
  RouterModule
} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  user = JSON.parse(localStorage.getItem("user") || "{}");

  dashboard = {

    totalAllocated: 0,
    totalUtilized: 0,
    totalRemaining: 0,
    totalDepartments: 0,
    totalExpenses: 0,
    totalAlerts: 0

  };

  recentExpenses: any[] = [];
  recentAlerts: any[] = [];

  budgetChart!: Chart;
  summaryChart!: Chart;

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard() {

    const headers = new HttpHeaders({

      Authorization:
        "Bearer " + localStorage.getItem("token")

    });

    this.http.get<any>(

      "https://ai-budget-monitoring-system.onrender.com/api/dashboard",

      { headers }

    ).subscribe({

      next: (res) => {

        this.dashboard = res.dashboard;

        this.recentExpenses =
          res.dashboard.recentExpenses || [];

        this.recentAlerts =
          res.dashboard.recentAlerts || [];

        this.cdr.detectChanges();

        setTimeout(() => {

          this.createCharts();

        },150);

      },

      error: err => {

        console.log(err);

      }

    });

  }

  createCharts(){

    if(this.budgetChart){

      this.budgetChart.destroy();

    }

    if(this.summaryChart){

      this.summaryChart.destroy();

    }

    this.budgetChart=new Chart("budgetChart",{

      type:"bar",

      data:{

        labels:[
          "Allocated",
          "Utilized",
          "Remaining"
        ],

        datasets:[{

          data:[
            this.dashboard.totalAllocated,
            this.dashboard.totalUtilized,
            this.dashboard.totalRemaining
          ],

          backgroundColor:[
            "#0d6efd",
            "#20c997",
            "#ffc107"
          ],

          borderRadius:10,

          borderSkipped:false

        }]

      },

      options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

          legend:{
            display:false
          }

        },

        scales:{

          y:{
            beginAtZero:true
          }

        }

      }

    });

    this.summaryChart=new Chart("departmentChart",{

      type:"pie",

      data:{

        labels:[
          "Departments",
          "Expenses",
          "Alerts"
        ],

        datasets:[{

          data:[
            this.dashboard.totalDepartments,
            this.dashboard.totalExpenses,
            this.dashboard.totalAlerts
          ],

          backgroundColor:[
            "#0d6efd",
            "#20c997",
            "#dc3545"
          ],

          hoverOffset:20

        }]

      },

      options:{

        responsive:true,

        maintainAspectRatio:true,

        aspectRatio:1,

        plugins:{

          legend:{

            position:"bottom",

            labels:{

              padding:20,

              usePointStyle:true,

              pointStyle:"circle",

              font:{

                size:14

              }

            }

          }

        }

      }

    });

  }

  logout(){

    localStorage.clear();

    this.router.navigate(["/"]);

  }

}