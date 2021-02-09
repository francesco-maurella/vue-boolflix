new Vue ({
  // ELEMENTO
  el : '#app',

  // DATI
  data : {
    movies : [],
    searchKey : ''

  },

  // METODI
  methods : {
    // Funzione cerca movie
    movieSearch : function(){
      const self = this;

      axios.get(
        'https://api.themoviedb.org/3/search/movie?api_key=a7cdee9ef91ea5bb1fa70822158b4b0b&query='
        + this.searchKey)
        .then(function(resp){
          // creazione lista movies
          self.movies = resp.data.results
        });
      },
      // Funzione recupero anno movie
      getMovieYear : function(data) {
      return data.slice(0, 4)
      }
    }
  });
