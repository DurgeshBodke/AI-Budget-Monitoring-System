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

import { ExpenseService } from '../../core/services/expense';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './expenses.html',
  styleUrl: './expenses.css'
})
export class Expenses implements OnInit {

  private service = inject(ExpenseService);

  private cdr = inject(ChangeDetectorRef);

  expenses:any[]=[];

  filteredExpenses:any[]=[];

  showForm=false;

  search='';

  approvedCount=0;

  pendingCount=0;

  expense:any={

    expenseId:'',

    budgetId:'',

    departmentId:'',

    category:'',

    amount:0,

    paymentMode:'Cash',

    expenseDate:'',

    description:'',

    status:'Approved'

  };

  ngOnInit():void{

    this.loadExpenses();

  }

    loadExpenses(): void {

    this.service.getExpenses().subscribe({

      next: (res: any) => {

        this.expenses = res.expenses || [];

        this.filteredExpenses = [...this.expenses];

        this.approvedCount = this.expenses.filter(

          (e: any) => e.status === "Approved"

        ).length;

        this.pendingCount = this.expenses.filter(

          (e: any) => e.status === "Pending"

        ).length;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  filterExpenses(): void {

    if (!this.search.trim()) {

      this.filteredExpenses = [...this.expenses];

      return;

    }

    const keyword = this.search.toLowerCase();

    this.filteredExpenses = this.expenses.filter((e: any) =>

      String(e.expenseId).toLowerCase().includes(keyword) ||

      String(e.budgetId).toLowerCase().includes(keyword) ||

      String(e.departmentId).toLowerCase().includes(keyword) ||

      String(e.category).toLowerCase().includes(keyword) ||

      String(e.paymentMode).toLowerCase().includes(keyword) ||

      String(e.status).toLowerCase().includes(keyword)

    );

  }

    saveExpense(): void {

    this.service.createExpense(this.expense).subscribe({

      next: () => {

        alert("Expense Added Successfully");

        this.expense = {

          expenseId: '',

          budgetId: '',

          departmentId: '',

          category: '',

          amount: 0,

          paymentMode: 'Cash',

          expenseDate: '',

          description: '',

          status: 'Approved'

        };

        this.showForm = false;

        this.search = '';

        this.loadExpenses();

      },

      error: (err) => {

        console.log(err);

        alert(err.error.message);

      }

    });

  }

  deleteExpense(id: string): void {

    if (confirm("Delete Expense?")) {

      this.service.deleteExpense(id).subscribe({

        next: () => {

          alert("Expense Deleted Successfully");

          this.loadExpenses();

        },

        error: (err) => {

          console.log(err);

          alert("Unable to delete expense.");

        }

      });

    }

  }

}