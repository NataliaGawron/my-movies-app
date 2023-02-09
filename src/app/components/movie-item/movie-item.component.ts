import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { IMAGES_SIZES } from 'src/app/utils/images.utils';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;

  imagesSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {}
}

