<template>
  <div class="flex w-full my-2 md:my-14 h-56 md:h-72 mx-auto relative justify-center">
    <img
      class="w-56 h-56 md:w-72 md:h-72 drop-shadow-xl absolute select-none"
      draggable="false"
      src="@/assets/images/pokebola-blanca.png"
      alt="pokemon"
    />
    <img
      class="brightness-0 w-56 h-56 md:w-72 md:h-72 drop-shadow-xl absolute select-none"
      draggable="false"
      :src="imgSrc"
      alt="pokemon"
    />
    <img
      v-if="showPokemon"
      class="fadeIn w-56 h-56 md:w-72 md:h-72 drop-shadow-xl absolute select-none"
      draggable="false"
      :src="imgSrc"
      alt="pokemon"
    />
  </div>
</template>

<script>
export default {
  props: {
    pokemonId: {
      type: Number,
      required: true
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ this.pokemonId }.svg`
    }
  }
};
</script>

<style scoped>
img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>
