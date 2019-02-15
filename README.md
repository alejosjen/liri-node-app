# [liri-node-app](https://drive.google.com/file/d/1L-5UOmtUHh4QRJBP9LIeDQTlCYjDvqQK/view)

This is a node application for someone looking up concert information, song info and music previews, and movie stats. The app will write your results in the log file and save all of your information for your later perusal.

APIs used
* BandsinTown
* Spotify
* OMdB

Node packages used
* Axios, fs, dotenv
* Momentjs, node-spotify-api

To USE:

Run npm i to load axios, fs, dotenv, moment, and node-spotify-api. Get your API keys from BandsInTown, Spotify and OMdB and save them in a .env file to access them from a keys file to protect the information from abuse. Make a log file to store the results using the file system (fs). In your main file create a series of if/else statements to run commands that will access the APIs, so if a user types in movies, the if statements will lead to that action and print out the results on screen and write to the log.

In the video demo you'll see input validation to catch random characters and blank entries, so there is also a little RegEx involved which you can find in the code. On blank entries the code will send a hard coded search term to return results.

Just a side note: The API keys are quick to get, but you'll need to write a sentence or two for BandsInTown to request it.

[This link will demo the process of searching bands, music, and movies.](https://drive.google.com/file/d/1L-5UOmtUHh4QRJBP9LIeDQTlCYjDvqQK/view)


![Liri Project Image](/assets/images/node_screencast_img.png)


Thanks for reading! Any suggestions or constructive feedback always appreciated!
[Jennifer Alejos](http://www.jenalejos.com)
