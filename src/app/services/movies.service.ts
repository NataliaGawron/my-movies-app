import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TvDto } from '../models/tv-show.model';
import { of, switchMap } from 'rxjs';
import { MovieDto } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey = '6345f816de1a2bd8b54098fe5c4f241f';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'popular') {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results);
      })
    );
  }

  getTvs(type: string = 'latest') {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((response) => {
        return of(response.results);
      })
    );
  }
}
