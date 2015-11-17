//This example shows how nodes and links can be represented differently

var margin = {t:100,l:100,b:100,r:100},
    width = document.getElementById('plot').clientWidth-margin.l-margin.r,
    height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var svg = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('transform',"translate("+margin.l+","+margin.t+")");

//TODO: customize the force layout
var force = d3.layout.force()

//Global scope variable for data
var data;

//Global scope variable for DOM selection of force layout nodes and links;
var nodes, links;

d3.json('data/force.json',function(err,d){
    console.log(d);
});

