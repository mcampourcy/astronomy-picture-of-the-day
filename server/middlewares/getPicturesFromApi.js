const fetch = require('node-fetch');

const compare = (a,b) => {
    if (a.date < b.date)
        return -1;
    if (a.date > b.date)
        return 1;
    return 0;
};

/**
 * Get Nasa's Api data depending a given period
 * @param {date}    start
 * @param {date}    end
 * @param {func}    req
 * @param {func}    res
 * @param {func}    next
 * @param {object}  pictures: the pictures already in database
 */
const getPicturesFromApi = (start, end, req, res, next, pictures = []) => {
    const startDate     = start.toISOString().substring(0, 10);
    const endDate       = end.toISOString().substring(0, 10);
    const source        = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${startDate}&end_date=${endDate}`;

    fetch(source)
        .then(response => response.json())
        .then(data => {
            for(let d of data) {
                const inDb = pictures.find(picture => picture.date === d.date);
                if(!inDb) pictures.push(d);
            }
            return pictures.sort(compare);
        })
        .then(response => {
            req.pictures = response;
            next();
        })
        .catch(error => console.error('Error:', error))

};

module.exports = getPicturesFromApi;