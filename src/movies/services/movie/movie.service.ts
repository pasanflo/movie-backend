import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IReturn } from 'src/movies/interfaces/i-return.interface';
import { CreateMovieDto } from 'src/movies/dto/create-movie-dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie-dto';
import { IMovie } from 'src/movies/interfaces/i-movie.interface';

@Injectable()
export class MovieService {

    constructor(
        @Inject('MOVIE_MODEL')
        private readonly movieModel: Model<IMovie>
    ) { }

    async findAll(): Promise<IReturn> {
        const myPromise = new Promise<IReturn>((resolve) => {
            this.movieModel.find().exec().then(r => {
                resolve({ msg: 'Received movies: ' + r.length, status: 200, data: r, code: 'OK', validRequest: true });
            });
        });
        return myPromise;
    }

    async create(createMovieDto: CreateMovieDto): Promise<IReturn> {
        const existMovie = await this.movieModel.exists({ imdbID: createMovieDto.imdbID });
        const myPromise = new Promise<IReturn>((resolve) => {
            if (!existMovie) {
                new this.movieModel(createMovieDto).save().then((saved) => {
                    resolve({ msg: 'Película creada', status: 200, data: saved, code: 'OK', validRequest: true })
                });
            }
            else {
                resolve({ msg: 'La película ya está creada como favorita.', status: 401, data: 'Bad Request', code: 'KO', validRequest: false });
            }
        });
        return myPromise;
    }

    async delete(id: string): Promise<IReturn> {
        const exist = await this.movieModel.exists({ _id: id });
        const myPromise = new Promise<IReturn>((resolve) => {
            if (!exist) {
                resolve({ msg: 'La película no existe como favorita', status: 500, data: undefined, code: 'KO', validRequest: false });
            }
            else {
                this.movieModel.deleteOne({ _id: id }).exec();
                resolve({ msg: 'La película fue eliminada', status: 200, data: id, code: 'OK', validRequest: true });
            }
        });
        return myPromise;
    }

    async update(updateMovieDto: UpdateMovieDto): Promise<IReturn> {
        if (updateMovieDto._id === undefined || updateMovieDto._id === '' || updateMovieDto._id.trim() === '') {
            return new Promise<IReturn>((resolve) => {
                resolve({ msg: 'Falta id', status: 400, data: undefined, code: 'KO', validRequest: false });
            })
        }
        const exist = await this.movieModel.exists({ _id: updateMovieDto._id });
        const myPromise = new Promise<IReturn>((resolve) => {
            if (!exist) {
                resolve({ msg: 'La película no existe', status: 400, data: undefined, code: 'KO', validRequest: false });
            }
            else {
                this.movieModel.findOneAndUpdate({ _id: updateMovieDto._id }, updateMovieDto, { new: true }).exec();
                resolve({ msg: 'La película fue modificada', status: 200, data: updateMovieDto, code: 'OK', validRequest: true });
            }
        });
        return myPromise;
    }

}

