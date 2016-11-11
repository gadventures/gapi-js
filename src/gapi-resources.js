export default class GapiResources {

  constructor() {
    this.resource = null;
  }

  get countries() { this.resource = 'countries'; return this; }
  set countries(value) { return this; }

  get places() { this.resource = 'places'; return this;}
  set places(value) { return this; }

  get transport_dossiers() { this.resource = 'transport_dossiers'; return this; }
  set transport_dossiers(value) { return this; }

  get activity_dossiers() { this.resource = 'activity_dossiers'; return this; }
  set activity_dossiers(value) { return this; }

  get accommodation_dossiers() { this.resource = 'accommodation_dossiers'; return this; }
  set accommodation_dossiers(value) { return this; }
}
