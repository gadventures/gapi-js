import { GapiGenerator, GapiResources } from './gapi-js';

const Gapi = GapiGenerator(GapiResources);

const g = new Gapi({ key: 'test_29fb8348e8990800ad76e692feb0c8cce47f9476', proxy: 'version=alldossiers' });


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

g.place_dossiers.get(1000).end( (err, res) => {
  console.log(res)
});
