import Gapi from './gapi-js';
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
      .toBe('https://rest.gadventures.com/countries/')

  });

  test('builds url w/ single arg', () => {
    mockG.countries;
    expect(mockG._getUrl('AF'))
      .toBe('https://rest.gadventures.com/countries/AF/')
  });

  test('builds url w/ more than one arg', () => {
    mockG.itineraries;
    expect(mockG._getUrl(2216, 2555))
      .toBe('https://rest.gadventures.com/itineraries/2216/2555/')
  })

});

