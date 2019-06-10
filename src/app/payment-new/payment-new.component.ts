import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PaystackService } from '../paystack.service';
import { Vendor } from '../model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { map } from 'rxjs/operators';
import { AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.css']
})

export class PaymentNewComponent implements OnInit {
  newPaymentForm: FormGroup;
  vendors: any = [];
  balances: any = [];

  transfer: any = [];
  transferID = '';

// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private paystackService: PaystackService, private router: Router, public ngxSmartModalService: NgxSmartModalService) {
    this.createForm();
  }

  onSubmit() {
    // this.submitted = true;
    console.log('Submitt!!!');

    const newPaymentFormData: any = this.newPaymentForm.value;
    console.log(newPaymentFormData);

    /*this.paystackService.newPayment(newPaymentFormData)
    .subscribe(
      data => console.log('Success! ', data),
      error => console.log('Error! ', error)
    );*/

    this.paystackService.newPayment(newPaymentFormData)
    .subscribe(data =>  {
      console.log('Awesome Data: ', data);
      this.transferID = data.data.id;
      console.log('transfer id: ', data.data.id);
      console.log(this.transferID);
    },
    error => {
      console.error(error);
    }
    );

    this.ngxSmartModalService.setModalData(this.transferID, 'myModal');
    // this.getAllVendors();
  }

  createForm() {
    this.newPaymentForm = this.fb.group({
      recipient: ['', Validators.required ],
      amount: ['', Validators.required ]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newPaymentForm.controls; }


  getAllVendors(): void {
    this.paystackService.getAllVendors().subscribe(data => {
      this.vendors = data;
      // console.log(data);
    });
  }

  getBalance(): void {
    this.paystackService.getBalance().subscribe(data => {
      this.balances = data;
      console.log(data);
      console.log(this.balances.body.data[0].balance);
    });
  }

  navAddVendors(): void {
    this.router.navigate(['vendor/add']);
  }

  navAllTransfers(): void {
    this.router.navigate(['payment/transfers/']);
  }

  ngOnInit() {
    this.getAllVendors();
    this.getBalance();
  }

}
