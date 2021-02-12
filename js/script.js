new Vue ({
  // ELEMENTO
  el : '#app',

  // DATI
  data : {
    results : [],
    query : ''
  },

  // METODI
  methods : {
    // Funzione richiamo TMDB Api
    getApi : function(type){
      const searchIn = type;
      axios.get(
        'https://api.themoviedb.org/3/search/' + type , {
          params : {
            api_key : 'a7cdee9ef91ea5bb1fa70822158b4b0b',
            query : this.query,
            language : 'it-IT'
          }
        }).then((resp) => {
          this.results = [...this.results, ...resp.data.results]
        });
      },
      // Funzione ricerca
      getSearch : function(data){
        this.results = [];
        this.getApi('movie');
        this.getApi('tv');
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
