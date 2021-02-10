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
        'https://api.themoviedb.org/3/search/movie?api_key=a7cdee9ef91ea5bb1fa70822158b4b0b&query=titanic')
        // + this.searchKey)
        .then(function(resp){
          // creazione lista movies
          self.movies = resp.data.results
        });
      },
      // Funzione recupero anno movie
      getMovieYear : function(data) {
        return data.slice(0, 4)
      },
      // Funzione voto
      getVote : function(vote, index) {
        const num = Math.ceil(vote / 2);
        const starClasses = []
        for (var i = 0; i < 5; i++) {
          if (i < num) {
            starClasses.push('fas')
          } else {
            starClasses.push('far')
          }
        }
        return starClasses[index-1];
      },
    }
  });
