import pokemonApi from "../api/pokemonApi"

const getPokemons = () => {
    const pokemonsArray = Array.from( Array(650) )
    return pokemonsArray.map((_, index) => index + 1)
}

const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    const pokemons = await getPokemonNames( mixedPokemons.splice(0,4) )

    return pokemons
}

const getPokemonNames = async( [poke_1, poke_2, poke_3, poke_4] = [] ) => {
    // const res = await pokemonApi.get(`/${p1}`)
    // console.log(res.data.name, res.data.id)
    // console.log(p1, p2, p3, p4)
    const promises = [
        pokemonApi.get(`/${poke_1}`),
        pokemonApi.get(`/${poke_2}`),
        pokemonApi.get(`/${poke_3}`),
        pokemonApi.get(`/${poke_4}`),
    ]

    const [ p1, p2, p3, p4] = await Promise.all( promises )

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id },
    ]
}

export default getPokemonOptions