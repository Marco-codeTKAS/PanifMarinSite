import { defineStore } from 'pinia';

export const useRutasStore = defineStore('counter', {
  state: () => ({
    listaRutas: [],
    diaSemana: 0,
  }),
});
