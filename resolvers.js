import {getMovies,
    getById,
    deleteMovie,
    addMovie } from './db.js';

const resolvers = {
    Query: {
        hello: () => "hello",
        movie: (_, {name}) => getById(id),
        movies : ()=> getMovies(),
        addMovie: (_,{name,score})=>addMovie(name,score),
        deleteMovie:(_,{id})=>deleteMovie(id),
    }
};
export default resolvers;