import { Student } from './../Model/students.model';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  public students!:Array<Student>
  public dataSource! : MatTableDataSource<Student>;
  public displayedColumns: string[] = ["id","firstname","lastname","code","programId","payments"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private StudentService:StudentService,
              private router:Router
  ){}
  ngOnInit(): void {
    this.StudentService.getAllStudents().subscribe({
      next: value =>{
        this.students = value;

        this.dataSource = new MatTableDataSource(this.students)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) =>{
        console.log(err);

      }
    })
  }

  getPaymentElement(student: Student) {

    this.router.navigateByUrl(`/admin/student-datails/${student.code}`)
  }
}
