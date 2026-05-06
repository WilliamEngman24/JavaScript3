'use strict';

/**
 * pet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pet.pet', ({ strapi }) => ({
  
  // return an object with fucntions custom routes

  async findUniqueSpecies(ctx) { 
    const pets = await strapi.documents('api::pet.pet').findMany({
      fields: ['species']
    });

    // using 'Set' to remove duplicates, using '...' to spread to an array
    const species = [...new Set(pets
      .map(pet => pet.species))] //from objects to strings
      .filter(species => species) // if undefined or empty, don't keep
      .sort(); //sort alphabetically
    
    ctx.body = { data: species }; 
  }
 }));
