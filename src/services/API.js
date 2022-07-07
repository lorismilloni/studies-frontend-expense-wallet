const getCurrenciesFromAPI = async () => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    /* console.log(request, 'o outro a gente já sabe que é o request'); */
    // espera a busca no endpoint
    const data = request.json();
    /* console.log(data, 'aqui ó a data'); */
    return data;
  } catch (error) {
    return error;
  }
};

export default getCurrenciesFromAPI;
