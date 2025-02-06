# Git Repo....
Url-Shortener Git Repo : https://github.com/Deepakprajapat769/Url_Shortener

# User Authentication
Create accounts and authenticate themselves using Google Sign-In
# Google Exess
* URL : console.developers. google.com
* GOOGLE_CLIENT_ID : " "
* GOOGLE_CLIENT_SECRET : " "
user registration and login endpoints
*registration : {PORT}/api/auth/google


# Create Short Url Api
This API will generate a concise link that redirects to the original URL, making it ideal for social media, emails, and other communication channels.

* Endpoints: {PORT}/api/shorten
* Body:{longUrl:string,topic:string,customAlias:string(option)}


# Redirect Short URL API
Redirect to the original URL based on the short URL alias, enabling seamless access to the long URL while tracking user engagement.

* using Redis improving the performance of the API by reducing database load.
* Endpoints: {PORT}/api/shorten/{alias}


# Analytics

* # Get URL Analytics API
Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.

* Endpoint:{PORT}/api/analytics/{alias}
* DATA EX :{
  "totalClicks":7,
  "uniqueUsers":1,
  "clicksByDate":[{"date":"2025-02-01","clicks":0},{"date":"2025-02-02","clicks":0},{"date":"2025-02-03","clicks":0},{"date":"2025-02-04","clicks":0},{"date":"2025-02-05","clicks":0},{"date":"2025-02-06","clicks":0},{"date":"2025-02-07","clicks":7}],
  "osType":[{"osName":"Postman","uniqueClicks":6,"uniqueUsers":1},{"osName":"Windows","uniqueClicks":1,"uniqueUsers":1}],
  "deviceType":[{"deviceName":"desktop","uniqueClicks":7,"uniqueUsers":1}]
  }

# Get Topic-Based Analytics API
Retrieve analytics for all short URLs grouped under a specific topic, allowing users to assess the performance of their links based on categories.

* Endpoint:{PORT}/api/analytics/topic/{topic}
* DATA EX :
{"totalClicks":11,
"uniqueUsers":1,
"clicksByDate":[{"date":"2025-02-01","clicks":0},{"date":"2025-02-02","clicks":0},{"date":"2025-02-03","clicks":0},{"date":"2025-02-04","clicks":0},{"date":"2025-02-05","clicks":0},{"date":"2025-02-06","clicks":0},{"date":"2025-02-07","clicks":11}],
"urls":[{"shortUrl":"HyEEuE8","totalClicks":4,"uniqueUsers":1},{"shortUrl":"X4tcFKs","totalClicks":7,"uniqueUsers":1}]}


