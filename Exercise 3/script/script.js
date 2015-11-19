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
var _nodes = [], _links = [];

d3.csv('data/world_migration_2010.csv',parse,dataLoaded);

function dataLoaded(err,data){
	//Set up force layout

	/*var nations = svg.selectAll('.nation')
		.data(nodes)
		.enter()
		.append('circle')
		.attr('class','nation node')
		.attr('r',3)
		.attr('cx',width/2)
		.attr('cy',height/2);
	var migration = svg.selectAll('.migration')
		.data(links)
		.enter()
		.insert('line','.nation').attr('class','migration link');

	force.on('tick',function(e){
		nations
			.attr('cx',function(d){return d.x})
			.attr('cy',function(d){return d.y});

		migration
			.attr('x1',function(d){return d.source.x})
			.attr('y1',function(d){return d.source.y})
			.attr('x2',function(d){return d.target.x})
			.attr('y2',function(d){return d.target.y});
	})
	.start()*/
}

function parse(d){
}

