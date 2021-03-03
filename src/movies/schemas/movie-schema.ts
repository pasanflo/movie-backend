import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true },
    rate: { type: Number, default: null },
    comment: { type: String },
});
