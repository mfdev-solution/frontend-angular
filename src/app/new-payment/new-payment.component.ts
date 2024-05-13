import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../Model/students.model';
import { StudentService } from '../services/student.service';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{




  public paymentFormFGroup !: FormGroup;
  public studentCode!: string;
  public paymentType : string[] = [];
  public padFileUrl! : string;
  public showProgress : boolean = false;

  constructor(private fb:FormBuilder,
    private actiatedRoute:ActivatedRoute,
    private studentService:StudentService){ }
  ngOnInit(): void {
    this.studentCode = this.actiatedRoute.snapshot.params['code'];
    for(let elem in PaymentType){
      let value = PaymentType[elem]
      if(typeof value === 'string')
        this.paymentType.push(value)
    }
    this.paymentFormFGroup = this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      fileSource:this.fb.control(''),
      filename:this.fb.control(''),
    })
  }

  selectFile(event: any) {
      // console.log(event.target.files[0]);
      if(event.target.files.length > 0) {
        let file = event.target.files[0]
        this.paymentFormFGroup.patchValue({
          fileSource:file,
          filename:file.name
        });
        this.padFileUrl = window.URL.createObjectURL(file)
     }
    }

     savePayment() {
      this.showProgress = true  
      let date:Date = new Date(this.paymentFormFGroup.value.date)
      let formattedDate :string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

      let formData : FormData = new FormData();

      formData.set('file',this.paymentFormFGroup.get('fileSource')!.value)
      formData.set('amount',this.paymentFormFGroup.value.amount)
      formData.set('type',this.paymentFormFGroup.value.type)
      formData.set('date',formattedDate)
      formData.set('studentCode',this.paymentFormFGroup.value.studentCode)


      this.studentService.savePayment(formData).subscribe({
        next: payment =>{
          alert("Payment saved successfully")

        },
        error: err => {
            console.log(err);

        },
      });
      this.showProgress



      }

      afterLoadComplete(event: PDFDocumentProxy) {
        console.log(event);

        }

}
