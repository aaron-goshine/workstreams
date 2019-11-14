/* global  */

var lastDraggedItem;

var streamConfig = [
  { 'name': 'Payment service', 'initial': 'PS' },
  { 'name': 'Payment Gateway (paypal)', 'initial': 'PG' },
  { 'name': 'Payment Gateway (card)', 'initial': 'PG' },
  { 'name': 'Business as usual', 'initial': 'BAU' }
];

var usersConfig = [
  {
    'name': 'Aaron Goshine',
    'nickname': 'Grand master G',
    'initial': 'AG',
    'id': 'id-01'
  },
  {
    'name': 'Hemanth Narravula',
    'nickname': 'Heman',
    'initial': 'HN',
    'id': 'id02'
  },
  {
    'name': 'Udaya Lekkala',
    'nickname': 'Bujji',
    'initial': 'UL',
    'id': 'id03'

  },
  {
    'name': 'Prasanjit Mohanty',
    'nickname': 'Jit',
    'initial': 'PM',
    'id': 'id04'

  },
  {
    'name': 'Chris Gordon',
    'nickname': 'Young wizzard',
    'initial': 'CG',
    'id': 'id05'

  },
  {
    'name': 'Chathura Fernando ',
    'nickname': 'Nandos',
    'initial': 'CH',
    'id': 'id06'

  }
];
//
// function addDashBorder (elemntList) {
//   elemntList.forEach(function (item) {
//     streamList.style.border = '';
//   });
// }
//
// function removeDashBorder () {
//
// }

function drag (event) {
  event.preventDefault();
  lastDraggedItem = document.getElementById(event.target.id);
}

function drop (event) {
  event.preventDefault();
  var pattern = new RegExp('stream-unit', 'g');
  if (event.target.className.match(pattern)) {
    event.target.appendChild(lastDraggedItem);
  }
  lastDraggedItem = null;
}

function allowDrop (ev) {
  ev.preventDefault();
}
window.onload = function () {
  var personTpl = document.querySelector('#person');
  var streamInfoTpl = document.querySelector('#stream-info');
  var streamBoxTpl = document.querySelector('#stream-boxes');

  streamConfig.forEach(function (item) {
    var streamInfoContent = document.importNode(streamInfoTpl.content, true);
    streamInfoContent.querySelectorAll('h4')[0].textContent = item.initial;
    var streamList = document.querySelector('#streams-list');
    streamList.appendChild(streamInfoContent);
  });

  for (let i = 1; i < 6; i++) {
    streamConfig.forEach(function (item) {
      var streamBoxContent = document.importNode(streamBoxTpl.content, true);
      document.querySelector('#day' + i).appendChild(streamBoxContent);
    });
  }

  usersConfig.forEach(function (user) {
    var personContent = document.importNode(personTpl.content, true);
    personContent.querySelectorAll('.person')[0].setAttribute('id', user.id);
    personContent.querySelectorAll('h4')[0].textContent = user.initial;
    var streamList = document.querySelector('#day1 > div:nth-child(1)');
    streamList.appendChild(personContent);
  });

  document.querySelectorAll('.person')
    .forEach(function (item) {
      item.addEventListener('drag', drag);
    });

  document.querySelectorAll('.stream-unit')
    .forEach(function (item) {
      item.addEventListener('drop', drop);
      item.addEventListener('dragover', allowDrop);
    });
};
