import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, Student } from '../Model/students.model';
import { environment } from '../Consts/environemnts';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient)  { }


  public getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(environment.backendHost+"/payments")
  }
  public getAllStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(environment.backendHost+"/students")
  }
  public getAllPaymentsByStudent(code:string):Observable<Array<Payment>>{

    return this.http.get<Array<Payment>>(environment.backendHost+ `/students/${code}/payments`)
  }
}
