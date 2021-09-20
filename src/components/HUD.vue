<template>
    <div class="grid grid-cols-2 items-center divide-x space-x-3 divide-black gap-1 bg-white/90 px-4 py-2 rounded-full shadow-lg">
      <div class="flex items-center">
        <h1 class="font-sans font-bold text-lg mr-2 uppercase">Vidas restantes</h1>
        <div class="flex relative">
          <svg v-for="heart in maxHearts" :key="heart" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div class="flex absolute">
            <svg v-for="heart in remainingHearts" :key="heart" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-current text-red-600 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex justify-around font-sans font-bold text-lg mr-2">
        <span class="uppercase">Puntaje</span>
        <span>{{ score }}</span>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      score: {
        type: Number,
        required: true
      },
      maxHearts: {
        type: Number,
        required: true,
      },
      remainingHearts: {
        type: Number,
        required: true,
      },
    }
}
</script>