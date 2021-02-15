new Vue ({
  // ELEMENTO
  el : '#app',

  // DATI
  data : {
    apiUrl : 'https://api.themoviedb.org/3/',
    apiKey : 'a7cdee9ef91ea5bb1fa70822158b4b0b',
    results : [],
    genres : [],
    cast : '',
    query : '',
    selected : ''
  },

  // METODI
  methods : {
    // Funzione richiamo TMDB Api
    getApi : function(type){
      axios.get(
        this.apiUrl + 'search/' + type , {
          params : {
            api_key : this.apiKey,
            query : this.query,
            language : 'it-IT'
          }
        }).then((resp) => {
          this.results = [...this.results, ...resp.data.results]
        });
        axios.get(
          this.apiUrl + 'genre/' + type + '/list', {
            params : {
              api_key : this.apiKey,
            }
          }).then((resp) => {
            resp.data.genres.forEach((element) => {
              if (!this.genres.includes(element)) {
                this.genres.push(element)
              }
            });
          });
        },
        // Funzione ricerca
        getSearch : function(data){
          this.results = [];
          this.genres = [];
          this.getApi('movie');
          this.getApi('tv');
        },
        // Funzione Visualizza Se
        showIf : function(item){
          let id;
          this.genres.forEach((element) => {
            if (element.name === this.selected) {
              console.log(element.id)
              id = element.id
            }
          })

          return item['genre_ids'].includes(id) || this.selected === ''
        },
        // Funzione Cast
        showCast : function(id){
          const cast = [];
          axios.get(
            this.apiUrl + 'movie/' + id + '/credits', {
              params : {
                api_key : this.apiKey,
                language : 'en-US'
              }
            }).then((resp) => {
              resp.data.cast.forEach((element) => {
                cast.push(element.name)
              });
              this.cast = cast.splice(0, 5).join(', ')
            });
          },
          // Funzione generi
          inGenres : function(array, element){
            return array.genre_ids.includes(element.id)
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
