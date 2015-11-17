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
    .on('tick',onForceTick)
    .start();


d3.select('#single').on('click',function(){
    force.stop()
        .on('tick',onForceTick)
        .start();
});
d3.select('#multi').on('click',function(){
    force.stop()
        .on('tick',onMultiFociTick)
        .start();
});



function onForceTick(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }

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

    function collide(dataPoint){
        var nr = dataPoint.r + 5,
            nx1 = dataPoint.x - nr,
            ny1 = dataPoint.y - nr,
            nx2 = dataPoint.x + nr,
            ny2 = dataPoint.y + nr;

        return function(quadPoint,x1,y1,x2,y2){
            if(quadPoint.point && (quadPoint.point !== dataPoint)){
                var x = dataPoint.x - quadPoint.point.x,
                    y = dataPoint.y - quadPoint.point.y,
                    l = Math.sqrt(x*x+y*y),
                    r = nr + quadPoint.point.r;
                if(l<r){
                    l = (l-r)/l*.1;
                    dataPoint.x -= x*= (l*.05);
                    dataPoint.y -= y*= l;
                    quadPoint.point.x += (x*.05);
                    quadPoint.point.y += y;
                }
            }
            return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
        }
    }
}

function onMultiFociTick(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }

    nodes
        .each(gravity(e.alpha*.1))
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})

    function gravity(k){
        //custom gravity: data points gravitate towards a straight line
        return function(d){
            var focus = {};
            focus.x = (d.x0 < width/2)?(width/3-100):(width*2/3+100);
            focus.y = height/2;

            d.y += (focus.y - d.y)*k;
            d.x += (focus.x - d.x)*k;
        }
    }

    function collide(dataPoint){
        var nr = dataPoint.r + 5,
            nx1 = dataPoint.x - nr,
            ny1 = dataPoint.y - nr,
            nx2 = dataPoint.x + nr,
            ny2 = dataPoint.y + nr;

        return function(quadPoint,x1,y1,x2,y2){
            if(quadPoint.point && (quadPoint.point !== dataPoint)){
                var x = dataPoint.x - quadPoint.point.x,
                    y = dataPoint.y - quadPoint.point.y,
                    l = Math.sqrt(x*x+y*y),
                    r = nr + quadPoint.point.r;
                if(l<r){
                    l = (l-r)/l*.1;
                    dataPoint.x -= x*= l;
                    dataPoint.y -= y*= l;
                    quadPoint.point.x += x;
                    quadPoint.point.y += y;
                }
            }
            return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
        }
    }
}


