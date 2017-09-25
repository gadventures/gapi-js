import Gapi from './gapi-js';


const g = new Gapi({ key: 'xxx', proxy: 'version=alldossiers' });
g.countries.list().page(1, 5).end((err, res) => {
  console.log(res.body.res)
});
