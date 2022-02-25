import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServices } from '../shared/layouts/servises/services';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Material } from '../shared/classes/material.service';

// import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/mate'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthServices, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params:Params) => {
      //  this.router.navigate(['/login'], {
      //   queryParams: {
      //     registered: true
      //   }
      // }),
      console.log(params['registered']);

      if (params['registered']) {
        console.log(params);
        Material.mat('Created. Now you can login')
        alert('Created. Now you can login')

      } else if (params['accessDenied']) {
        Material.mat('first log in to the system ')
        alert('first log in to the system ')

        console.log('OOOO');

      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }

  }

  onSubmit() {

    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/main'], {
        queryParams: {
          registered: true
        }
      }),
      
      error => {
        
        console.log(error);
        alert(error.error.message)
        Material.mat(error.error.message)
        this.form.enable()
      }

      
    )
  }

}
