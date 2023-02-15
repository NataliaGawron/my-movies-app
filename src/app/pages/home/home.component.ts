import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/item/item';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Item[] = [];
  topRatedTvShows: Item[] = [];
  airingTodayTvShows: Item[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response;
    });
    this.moviesService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response;
    });
    this.moviesService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response;
    });
    this.moviesService.getTvs('popular').subscribe((response) => {
      this.popularTvShows = response;
    });
    this.moviesService.getTvs('top_rated').subscribe((response) => {
      this.topRatedTvShows = response;
    });
    this.moviesService.getTvs('airing_today').subscribe((response) => {
      this.airingTodayTvShows = response;
    });
  }
}
