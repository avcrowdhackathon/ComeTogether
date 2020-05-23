export const Role = {
    admin: 
    { 
      name: ['admin'],
      inherits: ['user', 'health', 'verifier']
    },
    user: 
    { 
      name: ['user'],
      inherits: []
    },
    health: 
    { 
      name: ['health'],
      inherits: ['user']
    },
    verifier: 
    { 
      name: ['verifier'],
      inherits: ['user']
    }
  }