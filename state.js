module.exports = { usersConfig: [
  {
    'name': 'Aaron Goshine',
    'nickname': 'Gosh',
    'initial': 'AG',
    'id': 'id01'
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
    'nickname': 'Wizzard',
    'initial': 'CG',
    'id': 'id05'

  },
  {
    'name': 'Chathura Fernando ',
    'nickname': 'Nandos',
    'initial': 'CH',
    'id': 'id06'

  }
],

streamConfig: [
  { 'description': 'Payment Option',
    'initial': 'PP',
    'positions': [ [ ], [], [], ['id05', 'id06'], [] ]
  },
  { 'description': 'Payment Execute',
    'initial': 'PP',
    'positions': [ [], [], [], [], ['id04'] ]
  },
  { 'description': 'Secret management',
    'initial': 'SM',
    'positions': [ [], ['id01', 'id02', 'id03'], [], [], [] ]
  },
  { 'description': 'Business as usual',
    'initial': 'BAU',
    'positions': [ [], [], [], [], [] ]
  }
]
};
