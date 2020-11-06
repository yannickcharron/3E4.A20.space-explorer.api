import mongoose from 'mongoose';

const explorationSchema = mongoose.Schema({

    explorationDate: { type: Date, default: Date.now, required:true },
    coord: {
        lon: Number,
        lat: Number
    },
    scans: [{
        element: String,
        percent: Number, 
        id: false
    }],
    commment: String
}, {
    collection: 'explorations', id:false
});

export default mongoose.model('Exploration', explorationSchema);