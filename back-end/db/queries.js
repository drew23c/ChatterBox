var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/chatterbox1';
var db = pgp(connectionString);
let axios = require('axios');

function getAPI (url) {
    axios.get(url)
    .then(function(data){
            let listOfData = data.data;
                for (let i=0; i<listOfData.length; i++){
                    let item = listOfData[i];
                    let showId = Number(item.show.id);
                    let showName = item.show.name;
                    let showType= item.show.type;
                    let showLanguage = item.show.language;
                    let showIMG = item.show.image.original;
                    let showSummary = item.show.summary;
                    let showNetworkName = item.show.network.name;
                    let showRating = item.show.rating.average; 
                    let imageData = item.show.image;
                    let showRatingData = item.show.rating; 
                    let showNetworkData = item.show.network;
                    
                    let epId = Number(item.id);
                    let airDate = item.airdate;
                    let airTime = item.airtime;
                    let epSeason = item.season;
                    let epNum = item.number;
                    let epSummary = item.summary;
                    let epName= item.name;

           if (imageData&&showRatingData&&showNetworkName) {
            db.none('INSERT INTO shows (id, name, type, language, img_URL, show_summary, network_name, rating, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING;', [showId, showName, showType, showLanguage, showIMG, showSummary, showNetworkName, showRating, true])
            .then(() => {
                if (epSummary) {
                    db.none('INSERT INTO episodes (show_id, air_date, air_time, season, num, summary, ep_name) VALUES ($1, $2, $3, $4, $5, $6, $7)', [showId, airDate, airTime, epSeason, epNum, epSummary, epName])
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    db.none('INSERT INTO episodes (show_id, air_date, air_time, season, num, ep_name) VALUES ($1, $2, $3, $4, $5, $6)', [showId, airDate, airTime, epSeason, epNum, epName])
                    .catch((err) => {
                        console.log(err)
                    })
                 }
            })
            .catch((err) => {
                console.log(err)
            })
           } else {
            db.none('INSERT INTO shows (id, name, type, language, show_summary, active ) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING;', [showId, showName, showType, showLanguage, showSummary, true])
            .then(() => {
                if (epSummary) {
                    db.none('INSERT INTO episodes (show_id, air_date, air_time, season, num, summary, ep_name) VALUES ($1, $2, $3, $4, $5, $6, $7)', [showId, airDate, airTime, epSeason, epNum, epSummary, epName])
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    db.none('INSERT INTO episodes (id, air_date, air_time, season, num, ep_name) VALUES ($1, $2, $3, $4, $5, $6)', [showId, airDate, airTime, epSeason, epNum, epName])
                    .catch((err) => {
                        console.log(err)
                    })
                 }
            })
            .catch((err) => {
                console.log(err)
            })
        }  
        }
           })
       
    .catch(err => {
        console.error(err);
    })
}

function getAllShows(req, res, next) {
    db.any('SELECT * FROM shows')
      .then((data) => {
          res.status(200)
             .json({
                 data: data
             })
      }).catch((err) => {
          return next(err);
      })
}

function getAllEpisodes(req, res, next) {
    db.any('SELECT * FROM episodes')
      .then((data) => {
          res.status(200)
             .json({
                 data: data
             })
      }).catch((err) => {
          return next(err);
      })
}

function getSingleShow(req, res, next) {
    db.one('SELECT * FROM shows where shows.id=${showid}',
        {
            showid: req.params.showID
        }
    )
      .then((data) => {
          res.status(200)
             .json({
                 data: data
             })
      }).catch((err) => {
          return next(err);
      })
}


/*
function getSingleShow(req, res, next) {
    db.any(`
    SELECT *
    FROM shows
    where shows.id = ${showid}
    JOIN episodes ON shows.id = episodes.show_id
    GROUP BY shows.id, shows.name, episodes.ep_name, episodes.air_date, episodes.air_time, shows.network_name, episodes.season, episodes.num, episodes.summary, shows.show_summary, shows.rating, shows.img_URL
    `,
            {
                showid: req.params.showID
            }
        )

      .then((data) => {
          res.status(200)
             .json({
                 data: data
             })
      }).catch((err) => {
          return next(err);
      })
}
*/

function getSchedule(req, res, next) {
    db.any(`
        SELECT shows.id, shows.name, episodes.ep_name, episodes.air_date, episodes.air_time, shows.network_name, episodes.season, episodes.num, episodes.summary, shows.show_summary, shows.rating, shows.img_URL
        FROM shows
        JOIN episodes ON shows.id = episodes.show_id
        GROUP BY shows.id, shows.name, episodes.ep_name, episodes.air_date, episodes.air_time, shows.network_name, episodes.season, episodes.num, episodes.summary, shows.show_summary, shows.rating, shows.img_URL
        ORDER BY episodes.air_time;
        `)
      .then((data) => {
          res.status(200)
             .json({
                 data: data
             })
      }).catch((err) => {
          return next(err);
      })
}

getAPI('https://api.tvmaze.com/schedule/');


module.exports = {
    getAllShows,
    getAllEpisodes,
    getSchedule,
    getAPI,
    getSingleShow
}