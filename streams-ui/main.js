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

function drag (event) {
  event.preventDefault();
  window.streams.lastDraggedItem = document.getElementById(event.target.id);
}

function isAllowToUpdate (lp, np) {
  return ((lp[1] === np[1] && np[0] === (lp[0] + 1)) ||
    (lp[1] !== np[1] && np[0] === 0));
}

function drop (event) {
  event.preventDefault();
  var pattern = new RegExp('dropbox', 'g');
  if (event.target.className.match(pattern)) {
    var newState = {
      'position': event.target.getAttribute('data-position'),
      'userId': window.streams.lastDraggedItem.getAttribute('id')
    };
    // restrict dragging
    var lastUserStateArr = window.streams.state.usersConfig.filter(function (user) {
      return user.id === newState.userId;
    });

    var lastPos = lastUserStateArr[0].currentPosition.split(',')
      .map(function (n) {
        return parseInt(n, 10);
      });

    var newPos = newState.position.split(',')
      .map(function (n) {
        return parseInt(n, 10);
      });

    if (isAllowToUpdate(lastPos, newPos)) {
      updateUserPosition(newState);
      event.target.appendChild(window.streams.lastDraggedItem);
    } else {
      alert('You are not allowed to move markers around randomly');
    }
  }
  window.streams.lastDraggedItem = null;
}

function allowDrop (ev) {
  ev.preventDefault();
}

function upateState (refresh) {
  var magicKey = window.localStorage.getItem('magicKey');
  if (!magicKey) {
    alert('You will need magic to something like that');
    return;
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function (response) {
    console.log(this.responseText);
    if (refresh) {
      window.location.reload();
    }
  });
  oReq.open('POST', '/state');
  oReq.setRequestHeader('X-MAGIC-KEY', magicKey);
  oReq.send(JSON.stringify(window.streams.state));
};

function updateUserPosition (newState) {
  var updatedUsersConfig = window.streams.state.usersConfig.map(function (user) {
    if (user.id === newState.userId) {
      user.currentPosition = newState.position;
    }
    return user;
  });
  window.streams.state.usersConfig = updatedUsersConfig;
  upateState(false);
}

function renderApplication (state) {
  var personTpl = document.querySelector('#person');
  var streamInfoTpl = document.querySelector('#stream-info');
  var streamBoxTpl = document.querySelector('#stream-boxes');
  state.streamConfig.forEach(function (stream) {
    var streamInfoContent = document.importNode(streamInfoTpl.content, true);
    streamInfoContent.querySelectorAll('h4')[0].textContent = stream.title;
    streamInfoContent.querySelectorAll('h4')[0].setAttribute('id', stream.id);
    var streamList = document.querySelector('#streams-list');
    streamList.appendChild(streamInfoContent);
  });

  for (let i = 0; i < 5; i++) {
    state.streamConfig.forEach(function (stream, index) {
      var streamBoxContent = document.importNode(streamBoxTpl.content, true);
      var currentPosition = (i + ',' + index);
      streamBoxContent.querySelectorAll('.dropbox')[0].setAttribute('data-position', currentPosition);

      var users = window.streams.state.usersConfig.filter(function (user) {
        return user.currentPosition === currentPosition;
      });

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

  document.querySelectorAll('.stream-title')
    .forEach(function (item) {
      item.addEventListener('dblclick', function (event) {
        var newTitle = window.prompt('New title for stream');
        if (newTitle && newTitle.length > 0) {
          var streamId = event.currentTarget.getAttribute('id');
          window.streams.state.streamConfig = window.streams.state.streamConfig.map(function (stream) {
            if (stream.id === streamId) {
              stream.title = newTitle;
            }
            return stream;
          });
          upateState(true);
        }
      });
    });

  document.querySelectorAll('.stream-unit')
    .forEach(function (item) {
      item.addEventListener('drop', drop);
      item.addEventListener('dragover', allowDrop);
    });
}

function getState () {
  var state = JSON.parse(this.responseText);
  window.streams.state = state;
  renderApplication(state);
}

window.onload = function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', getState);
  oReq.open('GET', '/state');
  oReq.send();
  // action buttons
  var addPlayers = document.getElementById('add-player');
  var editStreams = document.getElementById('edit-streams');

  addPlayers.addEventListener('click', function () {
    var newPlayer = {
      'name': null,
      'nickname': null,
      'initial': null,
      'id': null,
      'currentPosition': '0,1'
    };
    console.log(window.streams.state.usersConfig);
    alert('comming soon');
  }, false);

  editStreams.addEventListener('click', function () {
    var newStream = {
      'description': '',
      'title': null,
      'initial': null,
      'id': null };
    console.log(window.streams.state.usersConfig);
    alert('comming soon');
  }, false);
};
