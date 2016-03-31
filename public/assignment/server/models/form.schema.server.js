module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [],
        created: Date,
        updated: Date
    }, {collection: 'assignment.form'});
    return FormSchema;
};