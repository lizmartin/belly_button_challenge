// Read in json data file samples.json
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let bb_data;

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    bb_data = data;
    console.log(bb_data);

    // Get needed values for data set.
    let names = bb_data.names;
    let metadata = bb_data.metadata;
    let samples = bb_data.samples;
        // Loop through sample array to get data
        function listLoop(samples) {
            for (let i = 0; i < length.bb_data; i++) {
            console.log(samples[i]);
            }
        }

    let otu_ids = samples.id.map(index => index)

    let sampleArray = [names, metadata, samples, otu_ids]

// Create first graph
function plotMetric(sampleArray, names, metadata){
        let trace1 = {
            x: [names],
            y: [otu_ids],
            type: "bar",
            orientation: "h"
        };
    }
let data = [trace 1];
  // Create our second trace
  //let trace2 = {
    //x: [0, 1, 2, 3, 4, 5],
   // y: [0, 1, 4, 9, 16, 25],
    //type: "scatter"
  //};
  
  // The data array consists of both traces
  l//et data = [trace1, trace2];
  
  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("plot", data);
});