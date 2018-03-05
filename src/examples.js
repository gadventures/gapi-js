import Gapi from './gapi-js';


const g = new Gapi({ key: 'xxx', proxy: 'version=alldossiers' });


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

g.itineraries.get(2216, 2555).end( (err, res) => {
  console.log(res)
});
