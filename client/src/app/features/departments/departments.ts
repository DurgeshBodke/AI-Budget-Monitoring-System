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

import { DepartmentService } from '../../core/services/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments implements OnInit {

  private service = inject(DepartmentService);

  private cdr = inject(ChangeDetectorRef);

  departments:any[]=[];

  filteredDepartments:any[]=[];

  showForm=false;

  search='';

  activeDepartments=0;

  inactiveDepartments=0;

  department:any={

    departmentId:'',

    departmentName:'',

    departmentCode:'',

    departmentHead:'',

    status:'Active'

  };

  ngOnInit():void{

    this.loadDepartments();

  }
    loadDepartments() {

    this.service.getDepartments().subscribe({

      next: (res: any) => {

        this.departments = res.departments || [];

        this.filteredDepartments = [...this.departments];

        this.activeDepartments =
          this.departments.filter(
            (d: any) => d.status === "Active"
          ).length;

        this.inactiveDepartments =
          this.departments.filter(
            (d: any) => d.status === "Inactive"
          ).length;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  filterDepartments() {

    if (!this.search.trim()) {

      this.filteredDepartments = [...this.departments];

      return;

    }

    this.filteredDepartments = this.departments.filter((d: any) =>

      d.departmentName.toLowerCase().includes(this.search.toLowerCase()) ||

      d.departmentCode.toLowerCase().includes(this.search.toLowerCase()) ||

      d.departmentHead.toLowerCase().includes(this.search.toLowerCase()) ||

      d.departmentId.toLowerCase().includes(this.search.toLowerCase())

    );

  }

  saveDepartment() {

    this.service.createDepartment(this.department).subscribe({

      next: () => {

        alert("Department Added Successfully");

        this.department = {

          departmentId: '',

          departmentName: '',

          departmentCode: '',

          departmentHead: '',

          status: 'Active'

        };

        this.showForm = false;

        this.search = '';

        this.loadDepartments();

      },

      error: (err) => {

        console.log(err);

        alert(err.error.message);

      }

    });

  }

  deleteDepartment(id: string) {

    if (confirm("Delete Department?")) {

      this.service.deleteDepartment(id).subscribe({

        next: () => {

          this.loadDepartments();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  }

}