import { Timestamp } from "firebase/firestore";

export type GestRoom ={
  area:string;
  bedType:string;
  capacity:string;
  capacityArea:string;
  checkIn:string;
  checkOut:string;
  empty:boolean;
  id:string;
  image:string;
  imagePlan1:string;
  price:number;
  price1:number;
  price2:number;
  price3:number;
  price4:number;
  roomFacility:string;
}

export type Plan ={
  checkIn:string;
  checkOut:string;
  food:string;
  image:string;
  payment:string;
  period:string;
  planDetail:string;
  planId:string;
  price:number;
  roomFacility:string;
  south:string;
  north:string;
  east:string;
  west:string;
  southPrice:number;
  northPrice:number;
  eastPrice:number;
  westPrice:number;
}

export type Reserved ={
  adultsNum:number;
  arrvalTime:number;
  checkIn:string;
  childrenNum:number;
  lodgeFirstName:string;
  lodgeLastName:string;
  lodgeNum:number;
  loginMail:string;
  contact:string;
  mail:string;
  price:string;
  payment:string;
  plan:string;
  reservationDate:string;
  reservationId:Timestamp;
  reservationFirstName:string;
  reservationLastName:string;
  roomType:string;
  tel:string;
}

export type User ={
  address:string;
  firstName:string;
  lastName:string;
  gender:string;
  mail:string;
  password:string;
  tel:string;
  zip:string;
}