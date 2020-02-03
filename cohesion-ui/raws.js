var players = [
  {
    'name': 'Aaron Goshine',
    'nickname': '925',
    'initial': 'AG',
    'id': 'id00',
    'currentPosition': '0, 0'
  },
  {
    'name': 'Hemanth Narravula',
    'nickname': 'Heman',
    'initial': 'HN',
    'id': 'id01',
    'currentPosition': '0, 2'
  },
  {
    'name': 'Udaya Lekkala',
    'nickname': 'Bujji',
    'initial': 'UL',
    'id': 'id02',
    'currentPosition': '0, 3'
  },
  {
    'name': 'Prasanjit Mohanty',
    'nickname': 'Jit',
    'initial': 'PM',
    'id': 'id03',
    'currentPosition': '0, 2'
  },
  {
    'name': 'Chris Gordon',
    'nickname': 'Wizzard',
    'initial': 'CG',
    'id': 'id04',
    'currentPosition': '0, 1'
  },
  {
    'name': 'Chathura Fernando ',
    'nickname': 'F1',
    'initial': 'CF',
    'id': 'id05',
    'currentPosition': '0, 1'
  },
  {
    'name': 'Ivan Alberdi ',
    'nickname': 'Spaniard',
    'initial': 'IA',
    'id': 'id06',
    'currentPosition': '0, 3'
  }
];

let links = {};

for (var i = 0; i < players.length - 1; i++) {
  for (var j = i + 1; j < players.length; j++) {
    // e3r_er==
    let s1 = players[i].currentPosition.split(',')[1];
    let s2 = players[j].currentPosition.split(',')[1];
    if (s1 === s2) {
      let uniqueId = players[i].id + '-' + players[j].id;
      if (links[uniqueId]) {
        links[uniqueId].weight++;
      } else {
        links[uniqueId] = {
          id: uniqueId,
          source: players[i].id,
          target: players[j].id,
          weight: 1
        };
      }
    }
  }
}

console.log(links);
