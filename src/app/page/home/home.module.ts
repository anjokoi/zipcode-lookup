import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from 'app/page/home/components/search/search.component';
import { PlaceComponent } from 'app/page/home/components/place/place.component';
import { ZipCodeComponent } from 'app/page/home/components/zip-code/zip-code.component';
import { SharedModule } from 'shared/shared.module';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [
    SearchComponent,
    PlaceComponent,
    ZipCodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    SearchComponent,
  ]
})
export class HomeModule { }
