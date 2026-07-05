import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ReportService } from '../../core/services/report';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {

  private service = inject(ReportService);

  private cdr = inject(ChangeDetectorRef);

  reports = {

    totalDepartments: 0,

    totalBudgets: 0,

    totalExpenses: 0,

    totalAlerts: 0

  };

  loading = true;

  ngOnInit(): void {

    this.loadReport();

  }

  loadReport(): void {

    this.service.getReports().subscribe({

      next: (res: any) => {

        this.reports = {

          totalDepartments: res.totalDepartments || 0,

          totalBudgets: res.totalBudgets || 0,

          totalExpenses: res.totalExpenses || 0,

          totalAlerts: res.totalAlerts || 0

        };

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  exportPDF() {

    if (this.loading) {

      alert("Data not loaded yet.");

      return;

    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("AI Budget Monitoring Report", 14, 18);

    autoTable(doc, {

      startY: 30,

      head: [['Metric', 'Value']],

      body: [

        ['Departments', this.reports.totalDepartments],

        ['Budgets', this.reports.totalBudgets],

        ['Expenses', this.reports.totalExpenses],

        ['Alerts', this.reports.totalAlerts]

      ]

    });

    doc.save("Budget_Report.pdf");

  }

  exportExcel() {

    if (this.loading) {

      alert("Data not loaded yet.");

      return;

    }

    const worksheet = XLSX.utils.json_to_sheet([{

      Departments: this.reports.totalDepartments,

      Budgets: this.reports.totalBudgets,

      Expenses: this.reports.totalExpenses,

      Alerts: this.reports.totalAlerts

    }]);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "Report"

    );

    const buffer = XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array"

    });

    saveAs(

      new Blob([buffer]),

      "Budget_Report.xlsx"

    );

  }

}