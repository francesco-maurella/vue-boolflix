new Vue ({
  // ELEMENTO
  el : '#app',

  // DATI
  data : {
    apiUrl : 'https://api.themoviedb.org/3/',
    params : {
      api_key : 'a7cdee9ef91ea5bb1fa70822158b4b0b',
      language : 'it-IT'
    },
    error : false,
    noResults : false,
    results : [],
    genres : [],
    query : '',
    cast : '',
    selected : 'All'
  },

  // METODI
  methods : {
    getApi : function(type) {
      this.params.query = this.query;
      axios // richieste axios multiple
      .all([
        axios.get( // richiamo api ricerca
          this.apiUrl + 'search/' + type , {
            params : this.params
          }),
          axios.get( // richiamo api lista generi
            this.apiUrl + 'genre/' + type + '/list', {
              params : this.params
            })
          ])
          .then(axios.spread((results, genres) => {
            // lista risultati
            this.results = [...this.results, ...results.data.results];
            // se i risultati sono zero
            if (this.results.length === 0) {
              this.noResults = true;
            };
            // lista generi dinamica ad ogni query
            genres.data.genres.forEach((element) => {
              this.results.forEach((item) => {
                if (item.genre_ids.includes(element.id)
                && !this.genres.includes(element)) {
                  this.genres.push(element);
                }
              });
            });
          }));
        },

        // Funzione ricerca
        getSearch : function(){
          // azzeramento valori in data
          this.results = [];
          this.genres = [];
          this.error = false;
          // parte richiesta axios se la query non è vuota
          if (this.query != '') {
            this.getApi('movie');
            this.getApi('tv');
          }
        },

        // Funzione Visualizza Se
        showIf : function(item){
          let id;
          this.genres.forEach((element) => {
            if (element.name === this.selected) id = element.id
          })
          return item['genre_ids'].includes(id) || this.selected === 'All'
        },

        // Funzione Questo Cast
        thisCast : function(item){
          this.cast = false;
          let type = (item.title) ? 'movie/' : 'tv/'; // tipologìa item
          // richiesta cast in base all'item
          axios.get(
            this.apiUrl + type + item.id + '/credits',
            {params : this.params})
            .then((resp) => {
              let cast = [];
              resp.data.cast.forEach((element) => {
                cast.push(element.name) // nomi in cast
              });
              // stringa finale: primi cinque elementi del cast appena popolato
              this.cast = cast.splice(0, 5).join(', ');
            });
          },

          // Funzione Visibilità in base al genere
          inGenres : function(array, element){
            return array.genre_ids.includes(element.id);
          },

          // Funzione Voto
          getVote : function(vote, index) {
            const num = Math.ceil(vote / 2);
            const starClasses = [];
            // classi voto/stella variabili in base al voto
            for (var i = 0; i < 5; i++) {
              (i < num) ?
              starClasses.push('fas') : starClasses.push('far');
            }
            return starClasses[index-1];
          },
        }
      });
