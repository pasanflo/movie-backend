import { Connection } from 'mongoose';
import { MovieSchema } from '../schemas/movie-schema';

export const movieProviders = [
    {
        provide: 'MOVIE_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('movies', MovieSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
