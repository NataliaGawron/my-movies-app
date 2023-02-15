import { Component, Input, OnInit } from '@angular/core';
import { Item } from './item';
import { IMAGES_SIZES } from 'src/app/utils/images.utils';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Item | null = null;

  imagesSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {}
}
