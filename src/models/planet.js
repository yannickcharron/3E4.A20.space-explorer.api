import mongoose from 'mongoose';

//Définition des variables membres, propriétés d'une planète

const planetSchema = mongoose.Schema({
    name: { type: String, unique: true },
    discoveredBy: { type: String, index: true},
    discoveryDate: Date,
    temperature: Number,
    satellites: [String],
    position: {
        x: { type: Number, min: -1000, max: 1000, required:true },
        y: { type: Number, min: -1000, max: 1000, required:true },
        z: { type: Number, min: -1000, max: 1000, required:true },
        
    }
},{
    collection:'planets',
    strict:'throw',
    id: false
});

planetSchema.virtual('explorations', {
    ref:'Exploration',
    localField:'_id',
    foreignField:'planet',
    justOne:false
});

// planetSchema.virtual('exploration', {
//     ref:'Explorateur',
//     localField:'discoveredBy',
//     foreignField:'name',
//     justOne:true
// });

export default mongoose.model('Planet', planetSchema);