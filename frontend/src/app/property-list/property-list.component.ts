import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from '../model/ipropertybase';
import { HousingService } from '../service/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IPropertyBase[] ;
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data;
        console.log(data);
      }, error => {
        console.log(error);
        console.log(error);
      }

    );

}

// tslint:disable-next-line: typedef
onCityFilter() {
  this.SearchCity = this.City;
}

// tslint:disable-next-line: typedef
onCityFilterClear() {
  this.SearchCity = '';
  this.City = '';
}

// tslint:disable-next-line: typedef
onSortDirection() {
  
  if (this.SortDirection === 'desc') {
    this.SortDirection = 'asc';
  } else {
    this.SortDirection = 'desc';
  }
}

}

