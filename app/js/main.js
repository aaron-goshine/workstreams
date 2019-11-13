/* global $ */

var lastDraggedItem;

var streamConfig = [
  { name: 'Payment service', 'initial': 'PS' },
  { name: 'Payment Gateway (paypal)', 'initial': 'PG' },
  { name: 'Payment Gateway (card)', 'initial': 'PG' },
  { name: 'Business as usual', 'initial': 'BAU' }
];

var usersConfig = [
  {
    'name': 'Aaron Goshine',
    'nickname': 'Grand master G',
    'initial': 'AG'
  },
  {
    'name': 'Hemanth Narravula',
    'nickname': 'Heman',
    'initial': 'HN'
  },
  {
    'name': 'Udaya Lekkala',
    'nickname': 'day day',
    'initial': 'UL'
  },
  {
    'name': 'Prasanjit Mohanty',
    'nickname': 'Jit',
    'initial': 'PM'
  },
  {
    'name': 'Chris Gordon',
    'nickname': 'young wizzard',
    'initial': 'CG'
  },
  {
    'name': 'Chathura Fernando ',
    'nickname': 'Nandos',
    'initial': 'CH'
  }
];

function allowDrop (event) {
  event.preventDefault();
}

function drag (event) {
  lastDraggedItem = document.getElementById(event.target.id);
}

function drop (event, next) {
  event.target.appendChild(lastDraggedItem);
  lastDraggedItem = null;
}

$(function () {
  // template

  // Instantiate the table with the existing HTML tbody
  // and the row with the template
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
    personContent.querySelectorAll('h4')[0].textContent = user.initial;
    var streamList = document.querySelector('#day1 > div:nth-child(1)');
    streamList.appendChild(personContent);
  });

  $('#steams-list');

  $('.person').on('drag', drag);

  $('.stream-unit').on('drop', drop);
  $('.stream-unit').on('dragover', allowDrop);
});
