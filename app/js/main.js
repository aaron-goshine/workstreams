window.streams = {};
window.streams.lastDraggedItem = null;
function addDashBorder () {
  document.querySelectorAll('.dropbox')
    .forEach(function (item) {
      item.style.border = '1px dashed #6d6';
    });
}

function removeDashBorder () {
  document.querySelectorAll('.dropbox')
    .forEach(function (item) {
      item.style.border = 'none';
      item.style.borderBottom = '1px solid  #d3d3d3';
    });
}

function getUserForPositions (ids) {
  return ids.map(function (id) {
    var match = window.streams.state.usersConfig.filter(function (user) {
      return user.id === id;
    });
    if (match.length > 0) {
      return match[0];
    }
  });
}

function drag (event) {
  event.preventDefault();
  window.streams.lastDraggedItem = document.getElementById(event.target.id);
}

function drop (event) {
  event.preventDefault();
  var pattern = new RegExp('dropbox', 'g');
  if (event.target.className.match(pattern)) {
    event.target.appendChild(window.streams.lastDraggedItem);
  }
  window.streams.lastDraggedItem = null;
}

function allowDrop (ev) {
  ev.preventDefault();
}

function renderApplication (state) {
  var personTpl = document.querySelector('#person');
  var streamInfoTpl = document.querySelector('#stream-info');
  var streamBoxTpl = document.querySelector('#stream-boxes');
  state.streamConfig.forEach(function (stream) {
    var streamInfoContent = document.importNode(streamInfoTpl.content, true);
    streamInfoContent.querySelectorAll('h4')[0].textContent = stream.initial;
    streamInfoContent.querySelectorAll('.description')[0].textContent = stream.description;
    var streamList = document.querySelector('#streams-list');
    streamList.appendChild(streamInfoContent);
  });

  for (let i = 0; i < 5; i++) {
    state.streamConfig.forEach(function (stream, index) {
      var streamBoxContent = document.importNode(streamBoxTpl.content, true);
      var users = getUserForPositions(stream.positions[i]);

      users.forEach(function (user) {
        var personContent = document.importNode(personTpl.content, true);
        personContent.querySelectorAll('.person')[0].setAttribute('id', user.id);
        personContent.querySelectorAll('h4')[0].textContent = user.initial;
        personContent.querySelectorAll('.nickname')[0].textContent = user.nickname;
        streamBoxContent.querySelectorAll('.stream-unit')[0].appendChild(personContent);
      });

      document.querySelector('#day' + (i + 1)).appendChild(streamBoxContent);
    });
  }

  document.querySelectorAll('.person')
    .forEach(function (item) {
      item.addEventListener('drag', drag);
      item.addEventListener('dragstart', function () {
        addDashBorder();
      });
      item.addEventListener('dragend', function () {
        removeDashBorder();
      });
    });

  document.querySelectorAll('.stream-unit')
    .forEach(function (item) {
      item.addEventListener('drop', drop);
      item.addEventListener('dragover', allowDrop);
    });
}

window.onload = function () {
  function reqListener () {
    var state = JSON.parse(this.responseText);
    window.streams.state = state;
    renderApplication(state);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', '/state');
  oReq.send();
};
