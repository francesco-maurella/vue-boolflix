new Vue ({
  // ELEMENTO
  el : '#app',

  // DATI
  data : {
    movies : [],
    tvseries : [],
    query : ''
  },

  // METODI
  methods : {
    // Funzione richiamo TMDB Api
    getApi : function(type){
      return axios.get(
        'https://api.themoviedb.org/3/search/' + type , {
          params : {
            api_key : 'a7cdee9ef91ea5bb1fa70822158b4b0b',
            query : this.query,
            language : 'it_IT'
          }
        })
      },
      // Funzione ricerca
      getSearch : function(){
        this.getApi('movie').then((resp) => {
          // creazione lista movies
          this.movies = resp.data.results
        });
        this.getApi('tv').then((resp) => {
          // creazione lista tv
          this.tvseries = resp.data.results
        });
      },
      // Funzione voto
      getVote : function(vote, index) {
        const num = Math.ceil(vote / 2);
        const starClasses = [];
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
