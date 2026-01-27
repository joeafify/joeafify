import * as migration_20260127_132226_seed_journey_items from './20260127_132226_seed_journey_items';

export const migrations = [
  {
    up: migration_20260127_132226_seed_journey_items.up,
    down: migration_20260127_132226_seed_journey_items.down,
    name: '20260127_132226_seed_journey_items'
  },
];
