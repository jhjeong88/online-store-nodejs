import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { autoIncrement } from 'mongoose-plugin-autoinc';

const ContactsSchema = new Schema({
    name: String,
    phone: String,
    age: Number,
    email: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

ContactsSchema.virtual('getDate').get(function() {
    const date = new Date(this.created_at);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
});

ContactsSchema.plugin(autoIncrement, {model:'contacts', field: 'id', startAt: 1});
export const ContactsModel = mongoose.model('contacts', ContactsSchema);