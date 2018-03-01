import GapiResources from './gapi-resources';


export default class GapiPrivateResources extends GapiResources {

  constructor() {
    super();
    this.resource = null;
  }

  get accommodation_costs() { this.resource = 'accommodation_costs'; return this; }
  set accommodation_costs(value) { return this; }  

  get band_costs() { this.resource = 'band_costs'; return this; }
  set band_costs(value) { return this; }  

  get fixed_costs() { this.resource = 'fixed_costs'; return this; }
  set fixed_costs(value) { return this; }  

  get multishare_costs() { this.resource = 'multishare_costs'; return this; }
  set multishare_costs(value) { return this; }  

  get per_person_costs() { this.resource = 'per_person_costs'; return this; }
  set per_person_costs(value) { return this; }

  get per_person_variable_costs() { this.resource = 'per_person_variable_costs'; return this; }
  set per_person_variable_costs(value) { return this; }  

  get reporting_offices() { this.resource = 'reporting_offices'; return this; }
  set reporting_offices(value) { return this; }
}
