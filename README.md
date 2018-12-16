# [liri-node-app](https://alejosjen.github.io/liri-node-app/)

This is a node application for someone looking up concert information, song info and music previews, and movie stats. The command line uses Inquirer to help sort which search feature to use and then the app will write your results in the log file.


APIs used
* BandsinTown
* Spotify
* OMdB

Node packages used
* Axios, fs, dotenv
* Inquirer, Momentjs, node-spotify-api


The hard part was checking for errors with returned data. It is still a struggle to know where to put things, but I learned a lot about try and catch. I also learned to prevent errors with coding checks before the function gets too far. 


I'm glad to have learned how to keep API keys secret using dotenv and a keys file. It opens the door to using more databases that require a little more security.


There's a fun section of file information sharing with the "do-what-it-says" option, it reads random text and starts up one of the search calls.


The fun part was creating a user interface with Inquirer. It was a little tiring typing in the commands for each API search, so that was my solution. Splitting the different API calls into separate functions helped make it work.


Thanks for reading! Any suggestions or constructive feedback always appreciated!
[Jennifer Alejos](http://www.jenalejos.com)