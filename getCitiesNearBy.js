/**
 * Microservice Name: Nearby Cities Lookup Service
 * 
 * Description:
 * This microservice provides functionality to search for nearby French cities based on a given geographical point, using coordinates (latitude and longitude) and a specified distance. 
 * It is designed to work with PhusionPassenger and Express, and connects to a MySQL database to perform the query.
 * 
 * Author: Calysteau
 * 
 * Version: 1.2
 * 
 * Creation Date: 01/08/2024
 * 
 * Request Parameters:
 *  - lat: Latitude of the reference point
 *  - lon: Longitude of the reference point
 *  - dist: Distance in meters around the reference point
 * 
 * Usage Example:
 * GET /getCitiesNearBy?lat=48.8566&lon=2.3522&dist=10000
 * 
 * Notes:
 * Ensure environment variables for database connection (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE) are set up.
 */

if (typeof (PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

app.get('/services/getCitiesNearBy', (req, res) => {
    const { lon, lat, dist } = req.query;

    const query = `
        SELECT nom as name, code_postal as zipcode, code_commune as insee_code, SHAPE as coordinates
        FROM fr_lapostezipcode 
	    WHERE ST_Distance_Sphere(SHAPE, ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')'))) < ?;
    `;

    db.query(query, [lon, lat, dist], (err, results) => {
        if (err) {
            console.error("Error in the query:", err);
            res.status(500).json({ error: "Error in the query. API Endpoint : GET /getCitiesNearBy?lat=<lat>&lon=<lon>&dist=<dist>" });
            return;
        }
        res.json(results.length > 0 ? results : { info: "No city found with the requested parameters. API Endpoint : GET /getCitiesNearBy?lat=<lat>&lon=<lon>&dist=<dist>" });
    });
});

if (typeof (PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}
