// const Clarifai = require('clairifai');

// // const app = key Clarifai.App({
//     apiKey: '6dc7e46bc9124c5c8824be4822abe105'
// });

//     app.models 
//       .predict(
//         {
//           id: 'face-detection',
//           name: 'face-detection',
//           version: '6dc7e46bc9124c5c8824be4822abe105',
//           type: 'visual-detector',

//         }, this.state.input)

const fetchImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
     .increment('entries', 1)
     .returning('entries')
     .then(entries => {
        res.json(entries[0].entries);
     })
     .catch(err => res.status(400).json('unable to get entries'))
}

module.export = {
    fetchImage: fetchImage
};
