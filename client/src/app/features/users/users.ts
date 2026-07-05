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

import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  private service = inject(UserService);

  private cdr = inject(ChangeDetectorRef);

  users:any[]=[];

  filteredUsers:any[]=[];

  showForm=false;

  search='';

  adminCount=0;

  employeeCount=0;

  user:any={

    userId:'',

    name:'',

    email:'',

    phone:'',

    password:'',

    role:'Employee',

    departmentId:''

  };

  ngOnInit():void{

    this.loadUsers();

  }

  loadUsers(){

    this.service.getUsers().subscribe({

      next:(res:any)=>{

        this.users=res.users||[];

        this.filteredUsers=[...this.users];

        this.adminCount=this.users.filter(

          (u:any)=>u.role==="Admin"

        ).length;

        this.employeeCount=this.users.filter(

          (u:any)=>u.role==="Employee"

        ).length;

        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  filterUsers(){

    if(!this.search.trim()){

      this.filteredUsers=[...this.users];

      return;

    }

    const keyword=this.search.toLowerCase();

    this.filteredUsers=this.users.filter((u:any)=>

      String(u.userId).toLowerCase().includes(keyword) ||

      String(u.name).toLowerCase().includes(keyword) ||

      String(u.email).toLowerCase().includes(keyword) ||

      String(u.role).toLowerCase().includes(keyword) ||

      String(u.departmentId).toLowerCase().includes(keyword)

    );

  }

    saveUser(){

    this.service.createUser(this.user).subscribe({

      next:()=>{

        alert("User Added Successfully");

        this.user={

          userId:'',

          name:'',

          email:'',

          phone:'',

          password:'',

          role:'Employee',

          departmentId:''

        };

        this.showForm=false;

        this.search='';

        this.loadUsers();

      },

      error:(err)=>{

        console.log(err);

        alert(err.error.message);

      }

    });

  }

  deleteUser(id:string){

    if(confirm("Delete User?")){

      this.service.deleteUser(id).subscribe({

        next:()=>{

          alert("User Deleted Successfully");

          this.loadUsers();

        },

        error:(err)=>{

          console.log(err);

          alert("Unable to delete user.");

        }

      });

    }

  }

}