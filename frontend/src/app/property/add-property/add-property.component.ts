import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();



  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
  cityList: any[];

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null,
    Image: '',
  };


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private http: HttpClient,
    private alertify: AlertifyService) { }









  ngOnInit() {

    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data => {
      this.cityList = data;
      console.log(data);
    });
  }
 // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: typedef

  // tslint:disable-next-line: typedef
  
  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],

      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
        Image: [null]
      })
      });
  }

//#region <Getter Methods>
  // #region <FormGroups>
      // tslint:disable-next-line: typedef
      get BasicInfo() {
        return this.addPropertyForm.controls.BasicInfo as FormGroup;
      }

      // tslint:disable-next-line: typedef
      get PriceInfo() {
        return this.addPropertyForm.controls.PriceInfo as FormGroup;
      }

      // tslint:disable-next-line: typedef
      get AddressInfo() {
        return this.addPropertyForm.controls.AddressInfo as FormGroup;
      }

      // tslint:disable-next-line: typedef
      get OtherInfo() {
        return this.addPropertyForm.controls.OtherInfo as FormGroup;
      }
  // #endregion

  //#region <Form Controls>
      // tslint:disable-next-line: typedef
      get SellRent() {
        return this.BasicInfo.controls.SellRent as FormControl;
      }

      // tslint:disable-next-line: typedef
      get BHK() {
        return this.BasicInfo.controls.BHK as FormControl;
      }

      // tslint:disable-next-line: typedef
      get PType() {
        return this.BasicInfo.controls.PType as FormControl;
      }

      // tslint:disable-next-line: typedef
      get FType() {
        return this.BasicInfo.controls.FType as FormControl;
      }

      // tslint:disable-next-line: typedef
      get Name() {
        return this.BasicInfo.controls.Name as FormControl;
      }

      // tslint:disable-next-line: typedef
      get City() {
        return this.BasicInfo.controls.City as FormControl;
      }

      // tslint:disable-next-line: typedef
      get Price() {
        return this.PriceInfo.controls.Price as FormControl;
      }

      // tslint:disable-next-line: typedef
      get BuiltArea() {
        return this.PriceInfo.controls.BuiltArea as FormControl;
      }

      // tslint:disable-next-line: typedef
      get CarpetArea() {
        return this.PriceInfo.controls.CarpetArea as FormControl;
      }

      get Security() {
        return this.PriceInfo.controls.Security as FormControl;
      }

      // tslint:disable-next-line: typedef
      get Maintenance() {
        return this.PriceInfo.controls.Maintenance as FormControl;
      }

      // tslint:disable-next-line: typedef
      get FloorNo() {
        return this.AddressInfo.controls.FloorNo as FormControl;
      }

      get TotalFloor() {
        return this.AddressInfo.controls.TotalFloor as FormControl;
      }

      // tslint:disable-next-line: typedef
      get Address() {
        return this.AddressInfo.controls.Address as FormControl;
      }

      // tslint:disable-next-line: typedef
      get LandMark() {
        return this.AddressInfo.controls.LandMark as FormControl;
      }

      get RTM() {
        return this.OtherInfo.controls.RTM as FormControl;
      }

      // tslint:disable-next-line: typedef
      get PossessionOn() {
        return this.OtherInfo.controls.PossessionOn as FormControl;
      }

      get AOP() {
        return this.OtherInfo.controls.AOP as FormControl;
      }

      get Gated() {
        return this.OtherInfo.controls.Gated as FormControl;
      }

      get MainEntrance() {
        return this.OtherInfo.controls.MainEntrance as FormControl;
      }

      get Description() {
        return this.OtherInfo.controls.Description as FormControl;
      }





  //#endregion
//#endregion

  // tslint:disable-next-line: typedef
  onBack() {
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

      if(this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }


    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }




  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;

    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }

}
