import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

// tslint:disable-next-line: typedef
success(message: string) {
  alertyfy.success(message);
}

// tslint:disable-next-line: typedef
warning(message: string) {
  alertyfy.warning(message);
}

// tslint:disable-next-line: typedef
error(message: string) {
  alertyfy.error(message);
}


}

