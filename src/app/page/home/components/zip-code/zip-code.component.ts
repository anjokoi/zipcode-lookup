import { Component, Input, OnInit } from '@angular/core';

import { ZipCode } from 'app/shared/types';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.scss']
})
export class ZipCodeComponent implements OnInit {
  @Input() zipCodes: ZipCode[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
