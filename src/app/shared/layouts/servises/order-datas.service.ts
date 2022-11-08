import { Injectable } from '@angular/core';
import { OrderDatas } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class OrderDatasService {

  constructor() { }

  public orderDatas: OrderDatas = {
    productTypeName: '',
    brendName: '',
    productColor: '',
    colorDefoult: '',
    productSize: ''
  }

  public imageSrc: string = '';
 
}
