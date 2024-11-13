// src/movie/dto/update-movie.dto.ts
export class UpdateMovieDto {
    title?: string;
    releaseDate?: Date;
    description?: string;
    duration?: number;
    rating?: number;
    countriesId?: number;
    releaseYear?: number;
    genresId?: number;
    image?: string;
    action?: boolean;
  }
  