import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDatas } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class OrderDatasService {


  public orderDatas: OrderDatas = {
    productTypeName: '',
    brendName: '',
    productColor: '',
    colorDefoult: '',
    productSize: ''
  }


  constructor() {

   }

  
   public defaultDatas():void {
    this.orderDatas.productTypeName = '';
    this.orderDatas.brendName = '';
    this.orderDatas.productColor = '';
    this.orderDatas.colorDefoult = '';
    this.orderDatas.productSize = '';
   }
  

  public imageSrc: string = '';
 
}
