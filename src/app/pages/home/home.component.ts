import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem } from 'src/app/models/movie.model';
import { mapTvShowToItem } from 'src/app/models/tv';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Item[] = [];
  topRatedTvShows: Item[] = [];
  airingTodayTvShows: Item[] = [];

  constructor(private moviesService: MoviesService, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
    });
    this.moviesService.getTvs('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
    this.moviesService.getTvs('top_rated').subscribe((tvShows) => {
      this.topRatedTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
    this.moviesService.getTvs('airing_today').subscribe((tvShows) => {
      this.airingTodayTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
  }
}
