// js/pets/petManager.js
export class PetManager {
  constructor() {
    this.pets = new Map(); // playerName -> pet
  }

  summonPet(player, petType) {
    const pet = {
      type: petType,
      name: `${petType}_${Math.floor(Math.random()*100)}`,
      level: 1,
      health: 50,
      damage: 5,
      abilities: []
    };
    this.pets.set(player.name, pet);
    return pet;
  }

  petLevelUp(player) {
    const pet = this.pets.get(player.name);
    if (pet) {
      pet.level++;
      pet.health += 10;
      pet.damage += 2;
    }
  }
}