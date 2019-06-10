import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PaystackService } from '../paystack.service';
import { Vendor } from '../model';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
})
export class VendorAddComponent implements OnInit {

  addVendorForm: FormGroup;
  submitted = false;
  vendors: any = [];
  banks: any = [];

// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private paystackService: PaystackService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.addVendorForm = this.fb.group({
      name: ['', Validators.required ],
      accountNumber: ['', Validators.required ],
      bankCode: ['', Validators.required ],
      description: ['', Validators.required ]
    });
  }

  onSubmit() {
    this.submitted = true;

    const newVendor: any = this.addVendorForm.value;
    console.log(newVendor);

    this.paystackService.addVendor(newVendor)
    .subscribe(
      data => console.log('Success! ', data),
      error => console.log('Error! ', error)     
    );
    this.getAllVendors();
  }

  getAllVendors(): void {
    // this._http.getRequest().subscribe(res=>this.requests=res);
    this.paystackService.getAllVendors().subscribe(data => {
      this.vendors = data;
      console.log(data);
      console.log(this.vendors.body);
      this.navAllVendors();
    });
  }

  navAllVendors(): void {
    this.router.navigate(['vendor/list']);
  }

  getBanks(): void {
    // this._http.getRequest().subscribe(res=>this.requests=res);
    this.paystackService.getBanks().subscribe(data => {
      this.banks = data;
      console.log(data);
    });
  }
 /*  onSubmit() {
    this.submitted = true;
    console.log(this.addVendorForm.value);
    this.ps.addVendor(this.addVendorForm.value)
        .subscribe(data => {
          console.log(data);
        });
  } */

  ngOnInit() {
    this.getBanks();
  }

}
