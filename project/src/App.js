import ASNData from "../ProcessedData/ASNData.json"; // obtain asn data
import CapitalLocations from "./locationsJson/CountryNames.json"; // obtain african nation geolocation data.
import p2crd from "../ProcessedData/P2CRelationshipData.json" // obtain peer to customer data Note: p2crd is acronym for P2CRelationshipData.
import p2prd from "../ProcessedData/P2PRelationshipData.json" // obtain peer to peer data Note: p2crd is acronym for P2PRelationshipData.


//initial geojson which will be used to map points onto the map.
const geoJsonInit = {
    type: "FeatureCollection",
    features: []
};

//function to create geoJson data
function populateAsnData(abbreviation, nationName, capitalLocation,asnValue) {
    var jsonObj = {
        type: "Feature",
        id: abbreviation, // assign the country's abbreviation as its ID.
        properties: {
            name: nationName, //add country Name.
            popupContent: nationName,
            asnNum: asnValue //assign the asn number.
        },
        geometry: {
            type: "Point", // indicate that this a point on the map.
            coordinates: capitalLocation // add in the country's latitude and longitude using the capital city.
        }
    };

    return jsonObj; // return the json object to be pushed to the features array.
}

//function to create geoJson data
function populateConnectionData(capitalLocation, colorOption) {
    var jsonObj = {
        type: "Feature",
        geometry: {
            type: "LineString", // indicate that this a point on the map.
            coordinates: capitalLocation, // add in the country's latitude and longitude using the capital city.
            style: {
                fill: colorOption // set color of line.
            }
        }
    };

    return jsonObj; // return the json object to be pushed to the features array.
}

/**
 * function used to create geojson for mapping asns onto the continent of Africa
 */
function geoJsonASNs() {
    /*
     * Firstly the application will access the ASN data from the ProcessedData folder.
     * In a loop it will check which country needs to be mapped onto the visualisation of Africa.
     * it will then create a json object for each nation following the format of example.json.
     * The coordinates of each nation will be retrieved from CountryNames.json
     */

    var asnLocations = geoJsonInit; // add in the initial elements.

    //loop through asnData
    ASNData.map((asnfileData) => {
        var countryName = asnfileData.country;
        var asnNumber = asnfileData.asn_num;
        //loop through capitalLocations to compare with countryName
        CapitalLocations.map((locationData) => {
            /*
             * compare countryName with all possible names for a country as listed in CountryNames.
             * if it matches then use populateAsnData function to create the data for our geojson.
             * push this data into the functions array in asnLocations.
             * if we do not find a match then we will assume the name used in the datafile is not a recognised one or we were unable to obtain the country's location.
             */
            if (
                countryName.toLowerCase() === locationData.name.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.name.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName1.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName1.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName2.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName2.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName3.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName3.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName4.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName4.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName5.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName5.toLowerCase() + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            } else if (
                countryName.toLowerCase() ===
                locationData.alternativeName6.toLowerCase() ||
                countryName.toLowerCase() ===
                "\u0022" + locationData.alternativeName6 + "\u0022"
            ) {
                asnLocations.features.push(
                    populateAsnData(
                        locationData.abbreviation,
                        locationData.name,
                        locationData.coordinates,
                        asnNumber
                    )
                );
            }
        });
    });

    return asnLocations; //return the geojson object.
}

function geoPtCASNs(mappingGeoJson) {
    /*
     * Firstly the application will access the ASN data from the ProcessedData folder.
     * In a loop it will check which country needs to be mapped onto the visualisation of Africa.
     * it will then create a json object for each nation following the format of example.json.
     * The coordinates of each nation will be retrieved from CountryNames.json
     */

    asnLocations = mappingGeoJson  // copy mappingGeoJson so as to avoid iterating through recently added features.

    //loop through jsonData
    p2crd.map((asnfileData) => {
        var customerASN = asnfileData.customer_as;
        var providerASN = asnfileData.provider_as;
        var locations = [];
        //loop through mappingGeoJson to compare with countryName
        mappingGeoJson.map((locationData) => {
            /*
             * compare the asn values to the asn of the point in mappingGeoJson
             */
            var nationASN = locationData.properties.asnNum;
            if (
                customerASN === nationASN ||
                providerASN === nationASN
            ) {
                locations.push(
                    locationData.geometry.coordinates
                );
            } 
        });
        asnLocations.features.push(populateConnectionData(locations, "red"));
    });
    return asnLocations;
    //return asnLocations; //return the geojson object.
}

function geoPtPASNs(mappingGeoJson) {
    /*
     * Firstly the application will access the ASN data from the ProcessedData folder.
     * In a loop it will check which country needs to be mapped onto the visualisation of Africa.
     * it will then create a json object for each nation following the format of example.json.
     * The coordinates of each nation will be retrieved from CountryNames.json
     */

    asnLocations = mappingGeoJson  // copy mappingGeoJson so as to avoid iterating through recently added features.

    //loop through jsonData
    p2prd.map((asnfileData) => {
        var providerASN1 = asnfileData.peer_as1;
        var providerASN2 = asnfileData.peer_as2;
        var locations = [];
        //loop through mappingGeoJson to compare with countryName
        mappingGeoJson.map((locationData) => {
            /*
             * compare the asn values to the asn of the point in mappingGeoJson
             */
            var nationASN = locationData.properties.asnNum;
            if (
                providerASN1 === nationASN ||
                providerASN2 === nationASN
            ) {
                locations.push(
                    locationData.geometry.coordinates
                );
            }
        });
        asnLocations.features.push(populateConnectionData(locations, "blue"));
    });
    return asnLocations;
    //    return asnLocations; //return the geojson object.
}

function obtainGeoJson() {
  var mappingData = geoJsonASNs();
  mappingData = geoPtCASNs(mappingData);
    geoPtCASNs();
    geoPtPASNs();
    return mappingGeoJson;
}
