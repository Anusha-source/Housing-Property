import { Component, Input, OnInit, ɵCurrencyIndex } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { removeListener } from 'process';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';
import { PropertyCardComponent } from '../property-card/property-card.components';



@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.scss']
})
export class DeletePropertyComponent implements OnInit {
  http: any;
  property: any;






  constructor() { }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  deleteProperty(id){
    
    }


  // tslint:disable-next-line: typedef



  // tslint:disable-next-line: align
  // tslint:disable-next-line: no-unused-expression

  // tslint:disable-next-line: typedef


}
