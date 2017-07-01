# Getting Started

This app is a small "single-page" JS app, relying on JQuery, Bootstrap3, and Flask. Once the Flask server spins up, it will scrape any "article.json" file and populate the Psql database. The JS code relies on the Flask server for JSON data.

The JS code was originally built to have JSON manually input, then I decided to just attach it to a Flask server - as such, I didn't go through the setup time to spin up something in React, but you can see some of the (hackey) philosophy in the JS file.

Note the Flask app is MINIATURE - Migrations and auto-db creation are NOT setup! Model, controller, and routes are in the single App.py file. I elected to avoid needless complication and Blueprints for this, but scaling out you would want to convert all that.

You must complete step 1 or else a Black Hole will explode!

1. PSQL: CREATE DATABASE cybrary_dev_test, then CREATE TABLE (id interger, data json)
- Important Note: This was developed on a Mac with peer auth; if you're on Ubuntu or simliar, you'll need to edit the Database URI with the user:pass@cybrary_dev_test accordingly

2. Pip install from requirements.txt (Flask, CORS, ipython, SQLAlchemy)

3. Run "Python App.py" in terminal, server should now be running on localhost://3000
  - the startup script will also check for a "articles.json" file, and if found populate the database; otherwise the database will be empty, and you will be sad

4. Simply "Open in Browser" index.js, point it at the server if needed

5. The "/" route does nothing, its just for testing purposes - use "/articles"

6. Once pointed at the "/articles" route, you should go directly to the home view of all articles displayed in descending format. Point and click from there


# To-Do

- Add detection of common "back" and "forward" buttons to compensate for "single-app-ness", and go back and forth accordingly (React Router would have helped here a lot...)

- Add auto-scroll to top for switching from article index to article detail view (currently sticks you where you were on the article index)

- Maintain page-position state for article index?

- Refactor state-startup currently fetching articles in indexPopulate function

- Clean up code, make look less like a dying horse

- Refactor state management 






\/ Please let me know if you want these removed, as this repo is currently public \/


# Cybrary Technical Interview
The purpose of this is to evaluate an interviewee’s technical knowledge and understanding in a day-to-day like scenario.

During this interview, the interviewee is given a group of articles in a JSON format. The interviewee must display all articles in a digestible format on page 1 and display each article in an easily readable format on page 2. The interviewee must also create a liking system for articles so the reader is able to express a positive reaction towards the article. Be sure to follow the requirements listed below.

**Note**
This interview is completely open book. During a work day you'll have access to anything on the internet so why not during the interview? Yes, that includes stackoverflow.

## Requirements
Be sure to tackle all the points specified under *Required*. Anything under *Optional* will **not** count against you.
Each Page can be interpreted as a navigable section of an application.

## Allowed
- Any Framework
- Any language

### Required
- [ ] Page 1 - The Landing Page
  * Display all articles in an easily digestible format on the page
    * The item should include the articles header image
    * The item should include the articles title
    * The item should include a short preview of the content
    * The item should include the date the article was published
  * No static items
    * Each item and its properties should be dynamic based on the provided data
  * Link the item to its article page when clicked on (see below)
    
- [ ] Page 2 - The Article Page
  * Display the article in an easily readable format
    * The page should include the article's header image
    * The page should include the article's title
    * The page should include the author of the article
    * The page should include the date the article was published
    * The page should include the full article
  * No static pages
    * The article and its related items should be dynamic based on the provided data
  * Add a liking system
    * Add a way to like the article (visually)
    * Keep track of the state to display if the user liked it or not
    * Can be stored client side for now
  * Responsiveness
    * Make the page responsive for a device of your choosing
    * Be prepared to explain why you chose this device and how you would make it responsive for other devices

### Optional
- [ ] Make pages fully responsive
- [ ] Create components and/or items from scratch
- [ ] Use of a database
  * Spin up a database of your choosing
  * Input the JSON data into the database
  * Connect to the database
  * Get data from the database
- [ ] List items by most liked
  * Introduce time decay to predict the heat-index-score of an article (Double Hypens === 'Hotness' # Right??)
