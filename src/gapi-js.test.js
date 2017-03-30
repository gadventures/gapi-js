import Gapi from './gapi-js';
const testKey = 'test_29fb8348e8990800ad76e692feb0c8cce47f9476';
let mockG = null;

describe('Resource', () => {

  test('Sets correct resource', () => {
    mockG = new Gapi({key: 123});
    mockG.countries;
    expect(mockG.resource).toBe('countries');
  });

});


describe('Gapi._getUrl()', () => {
  beforeEach(() => {
    mockG = new Gapi({key: 123});
  });
  test('Throws error if no resource provided', () => {
    expect(() => {
      mockG._getUrl()
    }).toThrow();
  });

  test('builds url w/o args', () => {
    mockG.countries;
    expect(mockG._getUrl())
      .toBe('https://rest.gadventures.com/countries')

  });

  test('builds url w/ single arg', () => {
    mockG.countries;
    expect(mockG._getUrl('AF'))
      .toBe('https://rest.gadventures.com/countries/AF')
  });

  test('builds url w/ more than one arg', () => {
    mockG.itineraries;
    expect(mockG._getUrl(2216, 2555))
      .toBe('https://rest.gadventures.com/itineraries/2216/2555')
  })

});

const parsePathIntoQsList = (pathString) => {
  const queryString = pathString.split('?')[1];
  return queryString.split('&').map((keyValue) => { return keyValue.split('='); })
}

const indexOfQsPropValPair = (qsList, [prop, val])=> {
  return qsList.reduce((foundIndex, qsItem, thisIndex) => {
    if (qsItem[0] === prop && qsItem[1] === val) {
      return thisIndex;
    }
    return foundIndex;
  }, -1);
}

const propPairToParam = ([isAsc, prop]) => { return `${isAsc ? '': '-'}${prop}`; }

const mapOrderPairsToPropsList = (orderPairs) => {
  return orderPairs.map((propPair) => { return propPairToParam(propPair); })
}

const isAscToParam = (isAsc) => { return `order_by__${isAsc ? 'asc': 'desc'}`; }

const orderPropPairToKeyValPair = (propPair) => { return [isAscToParam(propPair[0]), propPair[1]]; }

describe('Gapi.order', () => {
  beforeEach(() => {
    mockG = (new Gapi({ key: testKey})).countries.list();
  });

  test('refuses empty string props', () => {
    const orderedList = (prop) => {
      console.log("PRAP:", prop);
      mockG.order(prop);
    }
    expect(orderedList.bind(null, '-')).toThrow();
    expect(orderedList.bind(null, '')).toThrow();
  });

  describe('simple ordering', () => {
    beforeEach(() => {
      mockG.order('id');
    });

    test('request with end does not return error', (done) => {
      mockG.end((err, res) => {
        expect(err).toBeNull();
        done();
      });
    });

    test('request with then does not return error', (done) => {
      expect(mockG.then()).resolves.toBeTruthy();
    });

  });

  describe.only('complex ordering preserves precedence', () => {
    const orderProps = [[true, 'id'], [false, 'name'], [true, 'href']];
    const queryObj = {bork: 'me', till: 'fixed'};
    beforeEach(() => {
      mockG.query(queryObj).order(...mapOrderPairsToPropsList(orderProps));
    });
    test('params order is correct', (done) => {
      mockG.end((err, res) => {
        expect(err).toBeFalsy();
        const allPropValPairs = parsePathIntoQsList(res.req.path);
        orderProps.forEach((orderProp, index, orderProps) => {
          const firstPropIndex = indexOfQsPropValPair(allPropValPairs, orderPropPairToKeyValPair(orderProp));
          if (index === 0) {
            Object.keys(queryObj).forEach((queryProp) => {
              const queryPropIndex = indexOfQsPropValPair(allPropValPairs, [queryProp, queryObj[queryProp]]);
              expect(queryPropIndex).toBeLessThan(firstPropIndex);
            });
          }
          if (index < orderProps.length - 1){
            const otherOrderProp = orderProps[index + 1];
            const secondPropIndex = indexOfQsPropValPair(allPropValPairs, orderPropPairToKeyValPair(otherOrderProp));
            expect(firstPropIndex).toBeGreaterThan(-1);
            expect(firstPropIndex).toBeLessThan(secondPropIndex);
          }else{
            expect(firstPropIndex).toBeGreaterThan(-1);
          }
        });
        done();
      });

    });
  });
});

