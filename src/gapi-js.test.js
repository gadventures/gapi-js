import Gapi from './gapi-js';

describe('Resource', () => {

  test('Sets correct resource', () => {
    const mockG = new Gapi({key: 123});
    mockG.countries;
    expect(mockG.resource).toBe('countries');
  });

});


describe('Gapi._getUrl()', () => {

  test('Throws error if no resource provided', () => {
    const mockG = new Gapi({key: 123});
    expect(() => {
      mockG._getUrl()
    }).toThrow();
  });

  test('builds url w/o args', () => {
    const mockG = new Gapi({key: 123});
    mockG.countries;
    expect(mockG._getUrl())
      .toBe('https://rest.gadventures.com/countries')

  });

  test('builds url w/ single arg', () => {
    const mockG = new Gapi({key: 123});
    mockG.countries;
    expect(mockG._getUrl('AF'))
      .toBe('https://rest.gadventures.com/countries/AF')
  });

  test('builds url w/ more than one arg', () => {
    const mockG = new Gapi({key: 123});
    mockG.itineraries;
    expect(mockG._getUrl(2216, 2555))
      .toBe('https://rest.gadventures.com/itineraries/2216/2555')
  })

});
