
export interface Student{
  id : string,
  firstname: string,
  lastname: string,
  code : string,
  programId : string,
  photo : string
}

export interface Payment{
  id:number,
  date:string,
  mount:number,
  type:string,
  status:string,
  file:string,
  student:Student,

}

export enum PaymentType{
  CASH,CHECK,TRANSFER,DEPOSIT
}

export enum PaymentStatus{
  CREATED, VALIDATED,REJECTED
}
