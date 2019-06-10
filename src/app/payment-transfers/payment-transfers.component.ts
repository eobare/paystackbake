import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackService } from '../paystack.service';
import { TransfersModel } from '../model';

@Component({
  selector: 'app-payment-transfers',
  templateUrl: './payment-transfers.component.html',
  styleUrls: ['./payment-transfers.component.css']
})
export class PaymentTransfersComponent implements OnInit {

  transfers: any = [];

  constructor(private paystackService: PaystackService, private router: Router) { }

  ngOnInit() {
    this.getAllTransfers();
  }

  getAllTransfers(): void {
    // this._http.getRequest().subscribe(res=>this.requests=res);
    this.paystackService.getAllTransfers().subscribe(data => {
      this.transfers = data;
      console.log(data);;
    });
  }

  newPayment(): void {
    this.router.navigate(['payment/new']);
  }

}
