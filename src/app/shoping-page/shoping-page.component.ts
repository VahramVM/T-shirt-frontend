import { Component, OnInit } from '@angular/core';
import { EditorPicComponent } from '../editor-pic/editor-pic.component';
import { OrderDatas } from '../shared/interface';
import { OrderDatasService } from '../shared/layouts/servises/order-datas.service';


@Component({
  selector: 'app-shoping-page',
  templateUrl: './shoping-page.component.html',
  styleUrls: ['./shoping-page.component.scss']
})


export class ShopingPageComponent implements OnInit {

  constructor(private order: OrderDatasService) {

    
   }

  public imageSrc;
  public colorDefoult = this.order.orderDatas.colorDefoult;

  public props: OrderDatas = {
    productTypeName: this.order.orderDatas.productTypeName,
    brendName: this.order.orderDatas.brendName,
    productColor: this.order.orderDatas.productColor,
    colorDefoult: this.order.orderDatas.colorDefoult,
    productSize: this.order.orderDatas.productSize


  }

  

  ngOnInit(): void {
    const image = new Image();
    image.src = this.order.imageSrc;
    this.imageSrc = this.order.imageSrc;

    console.log(this.props);

  }



}
