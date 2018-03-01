import Gapi from './gapi-js';


const p = new Gapi({ key: 'live_791be390acce8bea78aa0c7795bda295c12281a8'});
// const p = new GapiPrivate({ key: 'live_791be390acce8bea78aa0c7795bda295c12281a8'});


const query = `query query {
  image($id: ID!) {
    id
    variations {
      image {
        modification
        file {
          url
        }
      }
    }
  }
}`;

const variables = {
  "id": "1234",
};

// g.graphQL(query, variables).end((err, res) => {
//   console.log(res.body.data)
// });

// g.itineraries.get(2216, 2555).end( (err, res) => {
//   console.log(res)
// });

p.activity_dossiers.get(6965).end( (err, res) => {
  console.log(res.body)
  console.log('-------------------')
});

p.reporting_offices.get(14).end( (err, res) => {
  console.log(res.body)
  console.log('=============')
});
