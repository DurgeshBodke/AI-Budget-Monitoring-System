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

import { BudgetService } from '../../core/services/budget';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './budgets.html',
  styleUrl: './budgets.css'
})
export class Budgets implements OnInit {

  private service = inject(BudgetService);

  private cdr = inject(ChangeDetectorRef);

  budgets:any[]=[];

  filteredBudgets:any[]=[];

  showForm=false;

  search='';

  totalAllocated=0;

  totalUtilized=0;

  totalRemaining=0;

  budget:any={

    budgetId:"",

    financialYear:"",

    allocationType:"Annual",

    quarter:"",

    departmentId:"",

    allocatedAmount:0,

    allocationDate:"",

    remarks:""

  };

  ngOnInit():void{

    this.loadBudgets();

  }

    loadBudgets() {

    this.service.getBudgets().subscribe({

      next: (res: any) => {

        this.budgets = res.budgets || [];

        this.filteredBudgets = [...this.budgets];

        this.totalAllocated = 0;

        this.totalUtilized = 0;

        this.totalRemaining = 0;

        this.budgets.forEach((b: any) => {

          this.totalAllocated += Number(b.allocatedAmount || 0);

          this.totalUtilized += Number(b.utilizedAmount || 0);

          this.totalRemaining += Number(b.remainingAmount || 0);

        });

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  filterBudgets() {

    if (!this.search.trim()) {

      this.filteredBudgets = [...this.budgets];

      return;

    }

    const keyword = this.search.toLowerCase();

    this.filteredBudgets = this.budgets.filter((b: any) =>

      String(b.budgetId).toLowerCase().includes(keyword) ||

      String(b.financialYear).toLowerCase().includes(keyword) ||

      String(b.departmentId).toLowerCase().includes(keyword) ||

      String(b.status || "").toLowerCase().includes(keyword)

    );

  }

    saveBudget() {

    this.service.createBudget(this.budget).subscribe({

      next: () => {

        alert("Budget Created Successfully");

        this.budget = {

          budgetId: "",

          financialYear: "",

          allocationType: "Annual",

          quarter: "",

          departmentId: "",

          allocatedAmount: 0,

          allocationDate: "",

          remarks: ""

        };

        this.showForm = false;

        this.search = "";

        this.loadBudgets();

      },

      error: (err) => {

        console.log(err);

        alert(err.error.message);

      }

    });

  }

  deleteBudget(id: string) {

    if (confirm("Delete Budget?")) {

      this.service.deleteBudget(id).subscribe({

        next: () => {

          alert("Budget Deleted Successfully");

          this.loadBudgets();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to delete budget.");

        }

      });

    }

  }

}