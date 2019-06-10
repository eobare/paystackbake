import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackService } from '../paystack.service';
import { VendorGet } from '../model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendorss: VendorGet[];
  // rawVendors = [];
  vendors: any = [];

  constructor(private paystackService: PaystackService, private router: Router) { }

  ngOnInit() {
    this.getAllVendors();
  }

  getAllVendors(): void {
    // this._http.getRequest().subscribe(res=>this.requests=res);
    this.paystackService.getAllVendors().subscribe(data => {
      this.vendors = data;
      console.log(data);
      console.log(this.vendors.body);
    });
  }

  addVendor(): void {
    this.router.navigate(['vendor/add']);
  }

  
}
