import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-load-students',
  templateUrl: './load-students.component.html',
  styleUrl: './load-students.component.css'
})
export class LoadStudentsComponent implements OnInit,AfterViewInit{
  public students : any;
  public dataSource : any;
  public displayedColumns = ["id","firstName","lastName","payments"]
  @ViewChild(MatPaginator) paginator! : MatPaginator
  @ViewChild(MatSort) sort! : MatSort;
  constructor(private router:Router) {
  }
  ngOnInit(): void {
    this.students= [];
    for(let i:number=1;i<100;i++){
      this.students.push(
        {
          id:i,
          firstName:Math.random().toString(20),
          lastName:Math.random().toString(20),
        }
      );
    }
    this.dataSource = new MatTableDataSource(this.students)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort  = this.sort;
  }


  searchStudent(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getPaymentElement(student:any){
    this.router.navigateByUrl("/payments").then(r => console.log(r));
  }
}
