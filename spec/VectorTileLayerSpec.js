/* eslint-env mocha */

var itemId = '1c365daf37a744fbad748b67aa69dac8';
var serviceUrl = 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Microsoft_Building_Footprints/VectorTileServer';
var token = '1234abcd';
var apikey = 'dcba4321';

// for layers hosted in ArcGIS Enterprise instead of ArcGIS Online
var onPremisePortalUrl = 'https://PATH/TO/ARCGIS/ENTERPRISE'; // defaults to https://www.arcgis.com
var onPremiseItemId = '1c365daf37a744fbad748b67aa69dac8';
var onPremiseServiceUrl = 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Microsoft_Building_Footprints/VectorTileServer';

describe('VectorTileLayer', function () {
  it('should have a L.esri.vectorTileLayer alias', function () {
    console.log('L.esri.Vector.vectorTileLayer', L.esri.Vector.vectorTileLayer);

    expect(L.esri.Vector.vectorTileLayer(itemId)).to.be.instanceof(L.esri.Vector.VectorTileLayer);
  });

  it('should save the key from the constructor - itemId', function () {
    const layer = L.esri.Vector.vectorTileLayer(itemId);

    expect(layer.options.key).to.equal(itemId);
  });

  it('should save the key from the constructor - serviceUrl', function () {
    const layer = L.esri.Vector.vectorTileLayer(serviceUrl);

    expect(layer.options.key).to.equal(serviceUrl);
  });

  it('should error if no key itemId or serviceUrl', function () {
    expect(function () {
      L.esri.Vector.vectorTileLayer();
    }).to.throw('An ITEM ID or SERVICE URL is required for vectorTileLayer.');

    expect(function () {
      L.esri.Vector.vectorTileLayer(false, {});
    }).to.throw('An ITEM ID or SERVICE URL is required for vectorTileLayer.');
  });

  it('should save the token from the constructor', function () {
    const layer = new L.esri.Vector.VectorTileLayer(itemId, {
      token: token
    });

    expect(layer.options.token).to.equal(token);
  });

  it('should save the api key as token from the constructor', function () {
    const layer = L.esri.Vector.vectorTileLayer(itemId, {
      apikey: apikey
    });

    expect(layer.options.token).to.equal(apikey);
  });

  it('should default to the "overlayPane"', function () {
    const layer = L.esri.Vector.vectorTileLayer(itemId);

    expect(layer.options.pane).to.equal('overlayPane');
  });

  it('should let the default pane be changed in the constructor', function () {
    const otherPane = 'shadowPane';
    const layer = L.esri.Vector.vectorTileLayer(itemId, {
      pane: otherPane
    });

    expect(layer.options.pane).to.equal(otherPane);
  });

  it('should default to ArcGIS Online as the base "portalUrl" for loading the style - itemId', function () {
    const layer = L.esri.Vector.vectorTileLayer(itemId);

    expect(layer.options.portalUrl).to.equal('https://www.arcgis.com');
  });

  it('should default to ArcGIS Online as the base "portalUrl" for loading the style - serviceUrl', function () {
    const layer = L.esri.Vector.vectorTileLayer(serviceUrl);

    expect(layer.options.portalUrl).to.equal('https://www.arcgis.com');
  });
  
  it('should let the base "portalUrl" be changed in the constructor for loading an on-premise style - itemId', function () {
    const layer = L.esri.Vector.vectorTileLayer(onPremiseItemId, {
      portalUrl: onPremisePortalUrl
    });

    expect(layer.options.portalUrl).to.equal(onPremisePortalUrl);
  });

  it('should let the base "portalUrl" be changed in the constructor for loading an on-premise style - serviceUrl', function () {
    const layer = L.esri.Vector.vectorTileLayer(onPremiseServiceUrl, {
      portalUrl: onPremisePortalUrl
    });

    expect(layer.options.portalUrl).to.equal(onPremisePortalUrl);
  });
});
