# Project Title

## 1. Project Description

State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ...

## 2. Names of Contributors
List team members and/or short bio's here...

- Hi my name is Davin. I'm excited about this project because it is my first time working with github in a group.
- Hi my name is Ran. I'm excited about this project and outcome at the end of this program.
- Hi my name is Hoa. I'm excited about this project because I feel like a pro now.

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- NPM 6.14.8
- Node v14.15.0

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...

- Login or Register to their profile.
- Select a bus stop from the Map View
- View the feed and either upload a photo or view the recent photos feed that other people have submitted from
- Save bus stops for easier access
- Search for bus stops if looking for a specific bus stop

## 5. Known Bugs and Limitations

Here are some known bugs:

- Our search feature requires specific keywords for stops
- Some posts in the news feed do not show pictures for certain posts
- The UI occasionally bugs out and has pictures that do not look good in the window resolution

## 6. Features for Future

What we'd like to build in the future:

- A points system for the news feed posts
- A better UI that works for different platforms
- A .csv reader to implement more bus stops in Vancouver 

## 7. Contents of Folder

Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── 404.html                 # error page when a page that does not exist is inputted
└── busLine.html             # page that shows list of bus lines
└── eachStop.html            # file that has the specified information for a specific bus stop
└── firebase.json            # firebase json file
└── firestore.indexes.json   # firebase index json file
└── firestore.rules          # firebase rules
└── friends.html             # friends page
└── home.html                # map (home) page that greets user
└── index.js                 # leftover file from node and express implementation
└── listView.html            # page that was going to be used for list view feature
└── login.html               # allows user to login, what users see to login
└── newsFeed.html            # page that shows when a user wants to add a new post
└── package-lock.json        # leftover node files
└── package.json             # leftover node files 
└── pets.html                # pets page that we wanted to implement a point retention system
└── README.md                # the current page that shows as our info page on GitHub
└── search.html              # the search page for bus stops that users can view
└── settings.html            # the settings page
└── storage.rules            # firebase rules
└── template.html            # template for our other html pages


It has the following subfolders and files:
├── .firebase                # firebase rules
├── images                   # Folder for images
    #####.jpg                # The # refers to the bus stop code, and an attached image of the bus stop
    drink#.png               # Example pictures from the template
    image.jpg                # Example logo from template
├── scripts                  # Folder for scripts
    authentication.js        # Authenticator from Firebase
    busLine.js               # Adds bus lines and can display them
    eachStop.js              # Used for specifying specific bus stop pages.
    favourite.js             # Handles favouriting for specific users
    firebaseAPI_BBY04.js     # Firebase codes for use with the database
    main.js                  # Handles logging out and displaying user name from Firebase
    map.js                   # the Mapbox
    newsFeed.js              # Displays posts for a specific feed
    search.js                # Handles search requests
    skeleton.js              # Handles the navbar and footer
├── styles                   # Folder for styles
    eachStop.css             # Style for eachStop page
    style.css                # Overall CSS theme
├── text                     # Folder for footer and navbar
    footer.html              # The footer display from Bootstrap
    nav_after_login.html     # Navbar for after login
    nav_before_login.html    # Navbar for pre login


```
