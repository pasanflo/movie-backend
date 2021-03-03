import { Module } from '@nestjs/common';
import { movieProviders } from './providers/movie';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './api/movie/movie.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...movieProviders, MovieService],
  controllers: [MovieController],
})
export class MoviesModule { }
