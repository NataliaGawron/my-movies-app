import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from 'src/app/utils/images.utils';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  imagesSizes = IMAGES_SIZES;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.fetchData();

    this.subscriptions.push(
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') || '';
          return this.moviesService.getMovie(id);
        })
      ).subscribe((movieData: Movie) => {
        this.movie = movieData;
      }),

      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') || '';
          return this.moviesService.getMovieVideos(id);
        })
      ).subscribe((movieVideosData: MovieVideo[]) => {
        this.movieVideos = movieVideosData;
      }),

      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') || '';
          return this.moviesService.getMovieImages(id);
        })
      ).subscribe((movieImagesData: MovieImages) => {
        this.movieImages = movieImagesData;
      }),

      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') || '';
          return this.moviesService.getMovieCredits(id);
        })
      ).subscribe((movieCreditsData: MovieCredits) => {
        this.movieCredits = movieCreditsData;
      }),

      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id') || '';
          return this.moviesService.getMovieSimilar(id);
        })
      ).subscribe((movieSimilarData: Movie[]) => {
        this.similarMovies = movieSimilarData;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private fetchData(): void {
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      const id = params.get('id') || '';
      this.moviesService.getMovie(id).subscribe((movieData: Movie) => {
        this.movie = movieData;
      });
      this.moviesService.getMovieVideos(id).subscribe((movieVideosData: MovieVideo[]) => {
        this.movieVideos = movieVideosData;
      });
      this.moviesService.getMovieImages(id).subscribe((movieImagesData: MovieImages) => {
        this.movieImages = movieImagesData;
      });
      this.moviesService.getMovieCredits(id).subscribe((movieCreditsData: MovieCredits) => {
        this.movieCredits = movieCreditsData;
      });
      this.moviesService.getMovieSimilar(id).subscribe((movieSimilarData: Movie[]) => {
        this.similarMovies = movieSimilarData;
      });
    });
  }
}
