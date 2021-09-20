<template>
  <div v-if="!pokemon" class="w-screen h-screen grid place-items-center">
    <h1 class="font-pokemon-solid tracking-widest text-xl md:text-3xl animate-pulse">Espere un momento...</h1>
    <img
      class="w-20 h-20 md:w-36 md:h-36 animate-spin"
      draggable="false"
      src="@/assets/images/pokebola.png"
      alt="pokemon"
    />
  </div>
  <div v-else class="bg-gradient-to-b from-red-800 to-red-400 w-screen h-screen animate-fade-in flex flex-col items-center justify-center">

    <HUD :maxHearts="maxHearts" :remainingHearts="remainingHearts" :score="score"/>

    <h1 class="font-pokemon-solid text-gray-800 my-2 md:my-4 tracking-widest text-lg md:text-3xl">¿Quién es este pokemon?</h1>
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    />
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer"
    />

    <template v-if="showAnswer">
      <h2 :class="['font-pokemon-solid tracking-widest font-light text-md md:text-xl my-3 md:my-5', isCorrect ? 'text-green-700' : 'text-red-800']">{{ message }}</h2>
      <!-- <h2 :class="['font-sans font-bold text-xl my-4', { 'text-red-600' : !isCorrect }]">{{ message }}</h2> -->
      <button v-if="remainingHearts > 0" :disabled="remainingHearts === 0" @click="nextAnswer" class="flex gap-2 bg-gray-100 rounded-md text-black font-bold py-2 px-4 uppercase">
        Siguiente
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
      <button v-else @click="newGame" class="flex gap-2 bg-yellow-400/70 rounded-md text-black font-bold py-2 px-4 uppercase">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        Nuevo Juego
      </button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions"
import PokemonPicture from "@/components/PokemonPicture"
import HUD from "@/components/HUD"

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components: { PokemonPicture, PokemonOptions, HUD },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      isCorrect: false,
      message: '',
      maxHearts: 3,
      remainingHearts: 3,
      score: 0,
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor( Math.random() * 4 )
      this.pokemon = this.pokemonArr[ rndInt ]
      // this.playSound(require('@/assets/sounds/quien_es_ese_pokemon.ogg'))
    },
    checkAnswer( selectedId ) {
      this.showPokemon = true
      this.showAnswer = true

      if(selectedId === this.pokemon.id) {
        this.message = `Correcto, es ${ this.pokemon.name.toUpperCase() }`
        this.playSound(require('@/assets/sounds/correct.wav'))
        this.isCorrect = true
        this.score += 100
      } else {
        this.message = `Oops!, era ${ this.pokemon.name.toUpperCase() }`
        this.playSound(require('@/assets/sounds/incorrect.mp3'))

        if(this.remainingHearts > 0) this.remainingHearts -= 1
      }
    },
    newGame() {
      this.showPokemon = false
      this.showAnswer = false
      this.isCorrect = false
      this.pokemonArr = []
      this.pokemon = null
      this.remainingHearts = 3
      this.score = 0
      this.mixPokemonArray()
    },
    nextAnswer() {
      this.showPokemon = false
      this.showAnswer = false
      this.isCorrect = false
      this.pokemonArr = []
      this.pokemon = null
      this.mixPokemonArray()
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
};
</script>
