//Multi-foci

var margin = {t:100,l:100,b:100,r:100},
    width = document.getElementById('plot').clientWidth-margin.l-margin.r,
    height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var svg = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('transform',"translate("+margin.l+","+margin.t+")");

var background = svg.append('rect')
    .attr('width',width)
    .attr('height',height).style('opacity',0)

var force = d3.layout.force()
    .size([width,height])
    .charge(0)
    .gravity(0);

//Make up some data points
var data = [];
for(var i=0; i<300; i++){
    var xPos = Math.random()*width;

    data.push({
        x:xPos,
        x0:xPos,
        y:height/2+Math.random()*5,
        r:Math.sin(xPos/width*Math.PI)*15+3+Math.random()*3
    });
}

console.log(data);

//Draw
var nodes = svg.selectAll('.node')
    .data(data)
    .enter()
    .append('circle').attr('class','node')
    .attr('cx',function(d){return d.x})
    .attr('cy',function(d){return d.y})
    .attr('r',function(d){return d.r})

//Collision detection
force.nodes(data)
    .on('tick',onTick)
    .start();


function onTick(e){
    nodes
        .each(gravity(e.alpha*.1))
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})

    function gravity(k){
        //custom gravity: data points gravitate towards a straight line
        return function(d){
            d.y += (height/2 - d.y)*k;
            d.x += (d.x0 - d.x)*k;
        }
    }

}