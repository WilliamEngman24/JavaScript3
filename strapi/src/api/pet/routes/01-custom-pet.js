module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pets/species',
      handler: 'pet.findUniqueSpecies',
      config: {
        auth: false,
        policies: [],
        middleware: []
      }
    }
  ]
};