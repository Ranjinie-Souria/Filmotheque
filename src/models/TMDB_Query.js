import axios from 'axios'


export default class TMDB {
    /**
     *
     * @param title : titre à rechercher
     */

    constructor () {

    }

    static get_movies_by_title(title) {
        let response = {};
         axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${title.replace(" ", "+") }&language=fr-FR`)
            .then( (response) => {
                if (response.status) {
                    response =  response.data.results;
                    console.log("1")
                    return response
                }
            });
        console.log("2")
        return response;
    }

    static get_img_by_id(id, path) {
        
    
    }
}