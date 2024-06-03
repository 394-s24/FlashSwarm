<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <pre>
______ _           _     _____                              
|  ___| |         | |   /  ___|                             
| |_  | | __ _ ___| |__ \ `--.__      ____ _ _ __ _ __ ___  
|  _| | |/ _` / __| '_ \ `--. \ \ /\ / / _` | '__| '_ ` _ \ 
| |   | | (_| \__ \ | | /\__/ /\ '  ' / (_| | |  | | | | | |
\_|   |_|\__,_|___/_| |_\____/  \_/\_/ \__,_|_|  |_| |_| |_|
                                                            
  </pre>

  <h3 align="center">FlashSwarm</h3>

  <p align="center">
    A tool to create on-the-go swarms.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#known-bugs">Known bugs</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/394-s24/FlashSwarm/assets/60253050/4cf2d4c1-2a5c-4007-8530-64668648a1a4)

FlashSwarm converts solo coding time into impromptu mini-swarms.

Our app let you:
* Let the team know when and where a swarm is happening
* Send real-time notifications with one-click availability for rapid response
* Record each swarm log for everyone to see in team review

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
<div style="text-align: center;" markdown="1">

[![Firebase][Firebase.google.com]][firebase-url]
[![React][React.js]][React-url]
[![Tailwind][Tailwindcss.com]][tailwind-url]

</div>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
  <p align="left">
  If you do not have npm installed, 
  <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">click here</a>
  </p>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/394-s24/FlashSwarm.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a Discord bot, and generate a Discord token (instructions [here](https://www.writebots.com/discord-bot-token/))

4. Enter your Discord Bot Token in `.env`
   ```js
   DISCORD_TOKEN= "Enter The Bot Discord Token"
   PORT = 3000
   ```
5. Create a Firebase project and register your app (instructions [here](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app)); relevant config to replace is at `utils/DatabaseFunc.js` 

6. Configure Firebase (instructions [here](https://firebase.google.com/docs/web/setup))

<!-- USAGE EXAMPLES -->
## Usage

1. Start the app
    ```sh
    npm run start
    ```
    This should start both the web app and start hosting the discord bot. 

2. Setup the discord bot by pinging it in the channel you want to send notifications to

3. Start a FlashSwarm using the web app

![image](https://github.com/394-s24/FlashSwarm/assets/60253050/e6fefa6a-edab-4153-ba03-3c452d524f93)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Known Bugs -->
## Known bugs 

- If a swarm is created before pinging the bot, an error will occur

See the [open issues](https://github.com/394-s24/FlashSwarm/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. View `license.txt` for more information. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Christopher Riesbeck - c-riesbeck@northwestern.edu

Project Link: [https://github.com/394-s24/FlashSwarm](https://github.com/394-s24/FlashSwarm.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Professor Risebeck's materials](https://courses.cs.northwestern.edu/394/guides/overviews.php)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: assets/bot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com
[Firebase.google.com]: https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34
[firebase-url]: https://firebase.google.com/
