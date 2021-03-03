import { Document } from 'mongoose';

export interface IMovie extends Document {
    readonly imdbID: string;
    readonly rate: number;
    readonly coment: string;
}