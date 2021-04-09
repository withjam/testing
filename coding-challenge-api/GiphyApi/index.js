const bent = require('bent');
const getJSON = bent('json');

function getRandom(rating) {
  return getJSON(
    `${process.env.GIPHY_API}/random?api_key=${process.env.GIPHY_API_KEY}${
      rating ? '&rating=' + rating : ''
    }`
  ).then((res) => res.data);
}

module.exports = async function (context, req) {
  // let them specify an optional rating
  const rating = req.query.rating || (req.body && req.body.rating);
  // let them specify an optional count, default is 3
  const length = req.query.count || (req.body && req.body.count) || 3;
  // request them at the same time but only respond when they all have completed
  const promises = Array.from({ length }, () => getRandom(rating));

  context.log(
    `JavaScript HTTP trigger function processed a request. ${
      process.env.GIPHY_API
    }/random?api_key=${process.env.GIPHY_API_KEY}${
      rating ? '&rating=' + rating : ''
    }`
  );

  const giphs = await Promise.all(promises);

  context.res = {
    body: {
      total: giphs.length,
      giphs,
    },
  };
};
