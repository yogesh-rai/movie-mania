
const useGenre = (selectedGenres) => {

    if(selectedGenres.length < 1) return "";

    const getId = selectedGenres.map((gen) => (gen.id));

    return getId.reduce((total,curr) => total + "," + curr);
}

export default useGenre;