# Gameofthrone
<h1>Game of Thrones Character Viewer</h1>
<p>The "Game of Thrones Character Viewer" is a ReactJS application that allows users to view and interact with character data from the "Game of Thrones" universe. The application fetches data from the "An API of Ice and Fire" and leverages the Agify API to guess character ages based on their first names. Users can sort, filter, and paginate through the character data, enhancing their exploration of the fictional world.
</p>

<h2>Table of Contents </h2>
<h3>Getting Started</h3>
<h2>Installation</h2>
<h2>Running the Application</h2>
Features
Character Display
Sorting
Filtering
Age Guessing
Technologies Used
Contributing
License

Getting Started
Installation
Clone the repository to your local machine:   git clone <repository-url>
Navigate to the project directory:   cd game-of-thrones-character-viewer
Install the required dependencies:   npm install
Running the Application
To run the application locally, execute the following command:

bash
npm start
The application will start, and you can access it by navigating to http://localhost:3000 in your web browser.


Features
Character Display
The application fetches character data from the "An API of Ice and Fire" and displays it in a table format. Each row represents a character, showing their name, gender, culture, and an estimated age based on the Agify API.

Sorting
Users can sort the character data based on different columns, including name, gender, and culture. Clicking on a column header will toggle the sorting order between ascending and descending.

Filtering
The application provides a search functionality that allows users to filter characters based on their name, gender, or culture. As users type into the search input, the character list dynamically updates to show only the matching results.

Age Guessing
The Agify API is integrated to estimate character ages based on their first names. The estimated ages are displayed alongside the character information in the table.

Technologies Used
ReactJS
Fetch API
Agify API
CSS (styling based on chosen CSS framework)
Node.js (for package management)
Contributing
Contributions are welcome! If you have any suggestions, bug reports, or improvements, please open an issue or submit a pull request on the GitHub repository.