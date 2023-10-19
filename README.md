# Nearby Cities Lookup Service

## Description
This microservice provides functionality to search for nearby French cities based on a given geographical point, using coordinates (latitude and longitude) and a specified distance. It is designed to work with PhusionPassenger and Express and connects to a MySQL database to perform the query.

**Author**: Calysteau

**Version**: 1.0

**Creation Date**: 10/19/2023

## Request Parameters
- **lat**: Latitude of the reference point
- **lon**: Longitude of the reference point
- **dist**: Distance in meters around the reference point

## Usage Example
``` GET /getCitiesNearBy?lat=48.8566&lon=2.3522&dist=10000 ```

## Configuration
Ensure environment variables for database connection (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE) are set up. You can use a `.env` file or configure these variables directly in your environment.

## Installation and Startup
1. Clone the repository or download the JS file.
2. Install necessary dependencies with `npm install` or `yarn install`.
3. Ensure environment variables are properly set.
4. Start the service with `npm start` or `yarn start`.

## Notes
- Ensure to secure your microservice, especially if you plan to expose it on the internet.
- For better error handling, make sure to validate input parameters and handle different errors that might arise.
- Consider adding tests to ensure the reliability of the service.

## Data Source

The data used by this microservice is sourced from the official postal codes dataset. For more details or to access the raw dataset, you can visit the official link: [Base officielle des codes postaux](https://www.data.gouv.fr/fr/datasets/base-officielle-des-codes-postaux/). We'd like to extend our gratitude to the contributors and maintainers of this dataset for making it publicly available, thereby aiding in the development of services like ours.


