import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  public dataSource:any;
  public payments:any;
  public displayedColumns = ["id","date","amount","type","status","firstName"]

  @ViewChild(MatPaginator) paginator! : MatPaginator

  @ViewChild(MatSort) sort! : MatSort;
  constructor(private http:HttpClient){}
  ngOnInit(): void {

    this.http.get("http://localhost:8022/payments").subscribe({
      next:value=>{
        this.payments = value;
        this.dataSource = new MatTableDataSource(this.payments)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:error=>{

      },
    })
   }


}
