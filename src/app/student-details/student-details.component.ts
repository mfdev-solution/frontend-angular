import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from '../Model/students.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{


  public studentCode!: string;
  public studentPayments!: Array<Payment>
  public paymentDataSource!:MatTableDataSource<Payment>;
  public displayedColumns = ["id","date","amount","type","status"]
  public studentName !: string;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private studentservice:StudentService,
              private activatedRoute : ActivatedRoute,
              private router:Router
   ){}

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code']

    this.studentservice.getAllPaymentsByStudent(this.studentCode).subscribe({
      next: payments=>{
        this.studentName = payments[0].student.firstname + " "+ payments[0].student.lastname;
        this.studentPayments = payments;
        this.paymentDataSource = new MatTableDataSource(this.studentPayments)
        this.paymentDataSource.sort = this.sort;
        this.paymentDataSource.paginator = this.paginator;
      },
      error:err=>console.log(err)

    })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
    }


}
