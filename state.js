module.exports = { usersConfig: [
  {
    'name': 'Aaron Goshine',
    'nickname': 'Grand master G',
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
],

streamConfig: [
  { 'name': 'Payment service',
    'initial': 'PS',
    'positions': [ [ ], [], [], [], ['id01', 'id02'] ]
  },
  { 'name': 'Payment Gateway (paypal)',
    'initial': 'PG',
    'positions': [ [], ['id04', 'id05'], [], [], [] ]
  },
  { 'name': 'Payment Gateway (card)',
    'initial': 'PG',
    'positions': [ [], ['id03', 'id06'], [], [], [] ]
  },
  { 'name': 'Business as usual',
    'initial': 'BAU',
    'positions': [ [], [], [], [], [] ]
  }
]
};
