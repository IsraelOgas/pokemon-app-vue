<template>
  <div class="flex justify-center">
    <div class="grid md:grid-cols-2 gap-4">
      <button
        v-for="{id, name} in pokemons"
        :key="id"
        :disabled="isClicked"
        @click="$emit( 'selection', id ), isClicked = !isClicked"
        :class="['option', isClicked ? 'cursor-not-allowed pointer-events-none bg-gray-100 text-gray-400' : 'cursor-pointer bg-white hover:bg-gray-100 hover:text-gray-700 group' ]"
      >
        <img class="w-24 opacity-50 absolute -right-10 -top-10 group-hover:animate-spin" src="@/assets/images/pokebola.png" alt="pokebola">
        {{ name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isClicked: false
    }
  },
};
</script>

<style scoped></style>
