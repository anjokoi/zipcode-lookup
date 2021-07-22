import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'shared/types';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  @Input() places: Place[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
