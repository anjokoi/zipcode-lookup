import { Component, OnInit } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, Observable, of, Subscription, throwError } from 'rxjs';

import { ZipService } from 'app/zip.service';
import { ZIP_CODE_PATTERN } from 'app/app.constant';
import { Place, ZipCode } from './../shared/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  zipCodes: ZipCode[] = [];

  code: string = '';

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  zipCode: string[] = [];

  zipCodeFormControl = new FormControl('', Validators.pattern(ZIP_CODE_PATTERN));

  observableCollections: Observable<Observable<any>[]> = of([]);

  searching: boolean = false;

  subscriptions: Subscription[] = [];

  get dontHaveResults() {
    return this.zipCodes.length === 0;
  }

  constructor(public zipService: ZipService) { }

  ngOnInit(): void {
    console.log('ngOnInit Search Component');
  }

  ngOnDestroy() {
    // Unsubscription all subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  search() {
    if (!this.zipCode.length) {
      return;
    }

    // flag to disable button when searching
    this.searching = true;

    // Collect all zip code subscriptions
    this.observableCollections = of(this.zipCode.map(c => this.zipService.getZipCode(c)));

    // Store subscriptions to subscriptions attribute to unsubscribe later
    this.subscriptions.push(
      this.observableCollections
        .pipe(switchMap(_ => combineLatest(_)), catchError((error: any) => {
          console.log(error);

          return throwError(error);
        }))
        .subscribe((response) => {
          this.searching = false;
          this.zipCodes = response.map((r: any) => ({
              country: r.country,
              postCode: r["post code"],
              countryAbbreviation: r["country abbreviation"],
              places: r.places.map((p: any) => ({ placeName: p["place name"], longitude: p.longitude, latitude: p.latitude, state: p.state, stateAbbreviation: p["state abbreviation"] }) as Place)
            } as ZipCode))
            .sort((a: ZipCode, b: ZipCode) => a.postCode.localeCompare(b.postCode));
        }, error => {
          console.error(error);
          this.searching = false;
        })
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    if (this.zipCodeFormControl.valid) {
      this.zipCode.push(value);
      this.zipCodeFormControl.reset();
    }
  }

  remove(code: string): void {
    const index = this.zipCode.indexOf(code);

    if (index >= 0) {
      this.zipCode.splice(index, 1);
    }
  }
}
