import {getMovies,
     } from './db.js';

const resolvers = {
    Query: {
        hello :()=>'hello',
        movies : (_, {limit, rating})=> getMovies(limit, rating),

    }
};
export default resolvers;