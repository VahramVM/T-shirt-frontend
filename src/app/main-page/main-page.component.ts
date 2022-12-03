import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDatasService } from '../shared/layouts/servises/order-datas.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public preview: boolean = false;

  constructor(
    private router: Router, private order: OrderDatasService) {}

  ngOnInit(): void {
  }
  
  redirectPreview() {

    this.preview = false;
    this.router.navigate(['/main']);

  }

}
