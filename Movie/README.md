# Movie 🎬

## Overview
A robust movie comparison application utilizing data from the OMDB API via `axios`. It features custom reusable autocomplete widgets, dynamic DOM manipulation for side-by-side data visualization, and parses complex data sets (using Regex and array reduction logic) to determine the statistical "winner" across metrics like Box Office earnings and IMDB ratings.

## Key Features
- **Asynchronous API Fetches:** Leverages `axios` to perform searches against the OMDB API.
- **Reusable Components:** Features an autocomplete widget designed to be functionally isolated and reusable across any web project.
- **Debouncing Inputs:** Manages rapid API requests on keypresses to prevent race conditions.
- **Complex Data Processing:** Implements statistical calculations like using Regex to remove formatted currencies and iterating through strings to accumulate values (e.g., Award points).
- **Dynamic DOM Generation:** Fully constructs visual cards and comparative notifications on the fly in JavaScript.

## How to Run / Usage
This is a standard client-side web application.
1. Navigate to the `Movie` directory.
2. Open `index.html` directly into any web browser. For a better development experience, use the "Live Server" extension in VS Code.
3. Search for two different movies to render side-by-side comparative statistic cards.

## Live Demo
[Live Demo](https://movie-seven-coral.vercel.app)
