[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/audrey-audrey/)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/audrey-audrey/fetch_v2">
    <img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/icons/logo.svg" alt="Logo" height="80">
  </a>

  <h3 align="center">fetch.</h3>

  <p align="center">
    A location-based friend finding app to connect dog owners for playdates!
    <!-- <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="">View Demo - TBD</a>
    ·
    <a href="https://github.com/audrey-audrey/fetch_v2/issues">Report Bug</a>
    ·
    <a href="https://github.com/audrey-audrey/fetch_v2/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
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
        <li><a href="#installation">Setup</a></li>
      </ul>
    </li>
    <li><a href="#">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Screenshot](https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/fetch.png)

This app was built as part of Lighthouse Labs' final project. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for the frontend, Rails 6 for the backend, and PostgreSQL as the database.

New in town? Want to meet more new dog-owning friends? This location based app helps you find dogs and dog-friendly places nearby. Find stuff to do and playmates - for you and your dog!

### Built With

* [React](https://reactjs.org/)
* [Ruby on Rails](https://rubyonrails.org/)
* [Google Maps API](https://developers.google.com/maps)
* [React Router](https://reactrouter.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Semantic UI](https://react.semantic-ui.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps!

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* react 16.14.0
* ruby 2.7.2
* rails 6.1.2
* axios 0.21.1
* react router 5.2.0
* react-google-maps/api 2.1.1

### Installation

1. Get a free API Key for Google Maps at [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Clone the repo
   ```sh
   git clone https://github.com/audrey-audrey/fetch_v2
   ```
3. Open client folder and install NPM packages
   ```sh
   npm install
   ```
5. Inside the client folder, enter your API in `.env` file
   ```JS
   const REACT_APP_API_KEY = 'ENTER YOUR API';
   ```
5. Open backend folder and install gems
   ```sh
   bundle install
   ```
### Setup  
From the root directory, type the following commands:
   ```sh
   cd backend/
   ```
   ```sh
   rake db:reset
   ```
   ```sh
   rails s -b 0.0.0.0
   ```

From the root directory in a new terminal, type the following commands: 
   ```sh
   cd client/
   ```
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->
## Usage
<p float="left">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/landing.png" width="400">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/signup.png" width="400">
</p>
User can sign up for an account or log in to an existing account from the landing page. 
<br>
<p float="left">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/map.png" width="400">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/card.png" width="400">
</p>
After logging in, user can see others in their area. Current user's marker is coloured yellow, and other users are orange. 
Clicking on a marker will open an info window with a profile photo, approximate distance away, an option to favourite the user, and a button to the user's profile page. 
<br>
<p float="left">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/navbar.png" width="400">
</p>
Clicking on the burger icon on the top left corner will open a side navigration bar where users can navigate to different pages. 
<br>
<p float="left">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/profile.png" width="400">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/edit.png" width="400">
</p>
User can navigate to their own Profile page, where they are able to edit information, such as their name, dog information, address, email, etc. 
(Currently working on a feature where user will be able to upload photos)
<br>
<p float="left">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/fav.png" width="400">
<img src="https://github.com/audrey-audrey/fetch_v2/blob/main/client/src/images/screenshots/message.png" width="400">
</p>
User can also navigate to their Favourites page, where they can view other profiles that they have saved. 
Navigate to the Conversations page to view messages and chat with other users to set up a meeting. 
<br>
<!-- ROADMAP -->
## Roadmap

Future developments for the app includes: 
1. Using yelp's API to display nearby dog-friendly places for users
2. Implementing websockets for updates between users
3. Integrating a scheduler for seamless meetup planning

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Audrey Untung - [@linkedin](https://www.linkedin.com/in/audrey-audrey/)

Project Link: [fetch_vs](https://github.com/audrey-audrey/fetch_v2/)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [React Burger Menu](https://github.com/negomi/react-burger-menu)
* [Nuka Carousel](https://github.com/FormidableLabs/nuka-carousel)
* [Animation](https://lottiefiles.com/18549-paws-animation)
* [Font Awesome](https://fontawesome.com)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
