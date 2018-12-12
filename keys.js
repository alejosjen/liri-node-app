console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  bandsAPI: process.env.BANDS_KEY
};

exports.ombd = {
  moviesAPI: process.env.OMBD_Key
};
