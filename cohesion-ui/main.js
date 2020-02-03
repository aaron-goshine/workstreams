/* global d3 */
var w = 960;
var h = 800;

var vis = d3.select('#graph')
  .append('svg:svg')
  .attr('width', w)
  .attr('height', h);

var nodes = [
  { 'label': 'AG', 'position': { x: 40, y: 40 } },
  { 'label': 'PM', 'position': { x: 100, y: 80 } },
  { 'label': 'UL', 'position': { x: 300, y: 200 } },
  { 'label': 'IC', 'position': { x: 60, y: 300 } },
  { 'label': 'CG', 'position': { x: 80, y: 120 } },
  { 'label': 'CF', 'position': { x: 400, y: 150 } }];

var links = [
  { source: 1, target: 2, weight: 2 },
  { source: 1, target: 4, weight: 6 },
  { source: 4, target: 5, weight: 1 }
];

nodes.map(function (d, i) {
  let angle = Math.PI / nodes.length;
  nodes[i].position.x = w / 2 + Math.sin(angle + i) * w / 3;
  nodes[i].position.y = h / 2 + Math.cos(angle + i) * h / 3;
});

vis.selectAll('line.link')
  .data(links)
  .enter()
  .append('svg:line')
  .attr('class', 'link')
  .attr('x1', function (d, i) {
    return nodes[d.source].position.x;
  })
  .attr('x2', function (d, i) {
    return nodes[d.target].position.x;
  })
  .attr('y1', function (d, i) {
    return nodes[d.source].position.y;
  })
  .attr('y2', function (d, i) {
    return nodes[d.target].position.y;
  })
  .attr('stroke-width', function (d, i) {
    return d.weight;
  })
  .style('stroke', '#CCC');

var node = vis.selectAll('g.node')
  .data(nodes)
  .enter()
  .append('svg:g')
  .attr('class', 'node')
  .attr('transform', function (data) {
    return 'translate(' + data.position.x + ', ' + data.position.y + ')';
  })
  .attr('y', 30);

node.append('svg:circle')
  .attr('r', 30)
  .style('fill', '#555')
  .style('stroke', '#FFF')
  .style('stroke-width', 3);

node.append('text')
  .attr('x', 30)
  .attr('y', 0)
  .attr('fill', '#555')
  .style('font-weight', 'bold')
  .style('font-size', '20')
  .text(function (data) {
    return data.label;
  });
