const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: String,
    category: String,
    template: String,
    description1: String,
    photoLink0: String,
    description2: String,
    photoLink1: String,
    description3: String,
    photoLink2: String,
    photoLink3: String,
    photoLink4: String,
    description4: String,
    photoLink5: String
});
const Project = mongoose.model('Project', projectSchema);

const teamSchema = new mongoose.Schema({
    name: String,
    designation: String,
    picLink: String
});
const Team = mongoose.model('Team', teamSchema);

const storiesSchema = new mongoose.Schema({
    title: String,
    text1: String,
    location: String,
    year: String,
    image1: String,
    text2: String,
    text3: String,
    text4: String,
    image2: String
});
const Story = mongoose.model('Stories', storiesSchema);


module.exports.Project = Project;
module.exports.Team = Team;
module.exports.Story = Story;