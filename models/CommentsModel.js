import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { autoIncrement } from 'mongoose-plugin-autoinc';

const CommentsSchema = new Schema({
    content: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    product_id: Number
});

CommentsSchema.plugin(autoIncrement, {model: 'comments', field: 'id', startAt: 1});
export const CommentsModel = mongoose.model('comments', CommentsSchema);