import * as migration_20260205_021400_init from './20260205_021400_init';

export const migrations = [
  {
    up: migration_20260205_021400_init.up,
    down: migration_20260205_021400_init.down,
    name: '20260205_021400_init'
  },
];
