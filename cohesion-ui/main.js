/* global d3 */
window.onload = function () {
  var oreq = new XMLHttpRequest();
  oreq.addEventListener('load', getstate);
  oreq.open('get', '/cohesion/stats');
  oreq.send();

  function getstate () {
    var data = JSON.parse(this.responseText);
    var w = 960;
    var h = 800;

    var vis = d3.select('#graph')
      .append('svg:svg')
      .attr('width', w)
      .attr('height', h);

    let players = Object.values(data.players);
    let links = Object.values(data.links);
    players = players.sort(function (a, b) {
      return a.id > b.id;
    });

    players.forEach(function (d, i) {
      let position = {};
      let angle = ((360 / players.length) * i) * Math.PI / 180;
      let x = (w / 2) + Math.cos(angle) * (w / 3);
      let y = (h / 2) + Math.sin(angle) * (h / 3);
      position.x = x;
      position.y = y;
      players[i]['position'] = position;
    });

    vis.selectAll('line.link')
      .data(links)
      .enter()
      .append('svg:line')
      .attr('class', 'link')
      .attr('x1', function (d, i) {
        var player = players.find(function (item) {
          return item.id === d.source;
        });

        return player.position.x;
      })
      .attr('x2', function (d, i) {
        var player = players.find(function (item) {
          return item.id === d.target;
        });

        return player.position.x;
      })
      .attr('y1', function (d, i) {
        var player = players.find(function (item) {
          return item.id === d.source;
        });

        return player.position.y;
      })
      .attr('y2', function (d, i) {
        var player = players.find(function (item) {
          return item.id === d.target;
        });

        return player.position.y;
      })
      .attr('stroke-width', function (d, i) {
        return d.weight;
      })
      .style('stroke', '#CCC');

    var node = vis.selectAll('g.node')
      .data(players)
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
        return data.initial;
      });
  };
};
