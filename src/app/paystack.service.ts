import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vendor } from './model';
import { VendorGet } from './model';
import { TransfersModel } from './model';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaystackService {

  uri = 'https://api-paystackbake.herokuapp.com';

  constructor(private http: HttpClient) { }

  addVendors(name, accountNumber, bankCode, description) {
    const obj = {
      name,
      accountNumber,
      bankCode,
      description
    };
    console.log(obj);
    this.http.post(`${this.uri}/api/transfer_recipients`, obj)
        .subscribe(res => console.log('Done'));
  }
  /*addVendor(vendor) {
    console.log('Vendor: ' + vendor);
    return this.http.post<any>(`${this.uri}/api/transfer_recipients`, vendor);
  }*/

  // POST:
  newPayments(transfer: TransfersModel): Observable<TransfersModel> {
    return this.http.post<TransfersModel>(`${this.uri}/api/transfer`, transfer);
  }

  newPayment(transfer): Observable<any> {
    return this.http.post<any>(`${this.uri}/api/transfer`, transfer)
    .pipe(
      map(response => {
        console.log('Resp: ', response);
        if (response) {
          return response;
        }
        // catchError(this.handleError);
      })
    );
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.uri}/api/transfer_recipients`, vendor);
  }

  getAllVendors() {
    return this.http.get<VendorGet[]>(`${this.uri}/api/transfer_recipients`);
  }

  getAllTransfers() {
    return this.http.get<TransfersModel[]>(`${this.uri}/api/transfers`);
  }

  getBanks() {
    return this.http.get<TransfersModel[]>(`${this.uri}/api/banks`);
  }

  getBalance() {
    return this.http.get<TransfersModel[]>(`${this.uri}/api/balance`);
  }

}
