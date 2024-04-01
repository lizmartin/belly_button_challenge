// Read in json data file samples.json
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
let bb_data;

// Fetch the JSON data and console log it
d3.json(url).then(function(bb_data) {

    // Create initial variables for data set.
    let subject_names = bb_data.names;
    let metadata = bb_data.metadata;
    let sample_set = bb_data.samples;
        // Loop through sample array to get data
        function init(){
            let filteredSamples = sample_set.filter(sample => sample.id =="940")

            // Create first graph (bar chart)
            let barGraph = [{
                 x: filteredSamples.map(item => item.sample_values.slice(0,10).reverse())[0],
                 y: filteredSamples.map(item => item.otu_ids.slice(0,10).reverse())[0].map(item => 'OTU ${item}'),
                 text: filteredSamples.map(item => item.otu_labels.slice(0,10).reverse())[0],
                 type: "bar",
                 orientation: "h"}];
            let graphLayout = {
                margin: {
                    l: 180,
                    r: 180,
                    t: 90,
                    b: 90,
                }
            };
            Plotly.newPlot("bar", barGraph, graphLayout);

            // Create second graph (bubble chart)
            let bubbleChart = [{
                x: filteredSamples.map(item => item.otu_ids)[0],
                y: filteredSamples.map(item => item.sample_values)[0],
                mode: 'markers',
                text: filteredSamples.map(item => item.otu_labels)[0],
                type: 'scatter',
                marker: {
                    size: filteredSamples.map(item => item.sample_values)[0],
                    color: filteredSamples.map(item => item.otu_ids)[0],
                }
            }];
            let bubble_layout = {
                xaxis: {title: "OTU ID"}
            };
            Plotly.newPlot("bubble", bubbleChart, bubble_layout);

            // Initial demographic card
            let metadata_info = d3.select("#sample-metadata");
            let filtered_metadata = metadata.filter(sample => sample.id == "940")[0];
            Object.entries(filtered_metadata).forEach(([key, v]) => {
                metadata_info.append("p").text('${key}: ${v}');
            });
        };

        // Drop down menu configuration
        let dropdown = d2.select("#selDataset");

        // Bind the subject names to drop down
        let options = dropdown.selectAll("options")
            .data(subjects)
            .enter()
            .append("option");
        options.text(sub => sub).attr("value", sub => sub);

        // Create function for the option change
        function optionSelect(){
            let selectedSubject = d3.select(this).property("value");
            updateGraphs(selectedSubject);
        };
init();
});

