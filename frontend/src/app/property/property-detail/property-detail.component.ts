import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/service/housing.service';
import { Property } from 'src/app/model/property';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { AlertifyService } from 'src/app/service/alertify.service';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
public propertyId: number;
property = new Property();
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService,
              private flashMessage: FlashMessagesService,
              private alertify: AlertifyService) { }

              showFlash() {
                // 1st parameter is a flash message text
                // 2nd parameter is optional. You can pass object with options.
                this.alertify.success('Liked Succesfully');
              }
              showFlash1() {
                // 1st parameter is a flash message text
                // 2nd parameter is optional. You can pass object with options.
                this.alertify.error('Disliked Succesfully');
              }
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );




    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/imgs/insert1.jpg',
        medium: 'assets/imgs/insert1.jpg',
        big: 'assets/imgs/insert1.jpg'
      },
      {
        small: 'assets/imgs/insert2.jpg',
        medium: 'assets/imgs/insert2.jpg',
        big: 'assets/imgs/insert2.jpg'
      },
      {
        small: 'assets/imgs/insert3.jpg',
        medium: 'assets/imgs/insert3.jpg',
        big: 'assets/imgs/insert3.jpg'
      },
      {
        small: 'assets/imgs/insert4.jpg',
        medium: 'assets/imgs/insert4.jpg',
        big: 'assets/imgs/insert4.jpg'
      },
      {
        small: 'assets/imgs/internal5.jpg',
        medium: 'assets/imgs/internal5.jpg',
        big: 'assets/imgs/internal5.jpg'
      }
    ];


  }
}
