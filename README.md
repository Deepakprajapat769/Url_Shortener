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