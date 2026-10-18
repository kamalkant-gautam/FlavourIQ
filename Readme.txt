
# Flavour IQ

Learn it. Taste it. Master it.

Flavour IQ is a food and beverage knowledge website with guides, industry trends and a quiz. It is a static website (plain HTML, CSS and JavaScript) hosted free on GitHub Pages.

Created by Kamal Kant Gautam.

## Features

- Landing page with a frosted-glass navigation bar, curtain scroll effect and day/night mode
- Food and Beverage guide menus (Pasta, Cheese, Pastry, Tea, Coffee)
- Search across all guides
- Quiz: 30 random questions per attempt from a growing question bank, with badges, explanations and feedback
- Trending in Industry section with the latest posts from trade websites
- About and Contact pages, with a visitor counter in the footer

## Folder structure

index.html                  Main website (landing, trending, about, contact)
quiz.html                   The quiz
guides/                     pasta.html, cheese.html, pastry.html, tea.html, coffee.html
assets/                     logo.png, favicon.png, apple-touch-icon.png, bosch.otf,
                            kamal.png, bg-night.jpg
data/questions.js           Quiz question bank
data/search-index.js        Search index built from the guides
data/trending.json          Latest trending posts (updated automatically)
scripts/fetch_trending.py   Script that fetches the latest posts
.github/workflows/trending.yml   Runs the script every 6 hours

## How to publish on GitHub Pages

1. Create a new repository on GitHub.
2. Upload all files and folders, with index.html at the top level.
3. Go to Settings > Pages.
4. Under Source, choose the main branch and the root folder, then save.
5. After a minute or two, your website link appears on that page.

To use a custom domain (for example flavouriq.in), buy the domain, then add it under Settings > Pages > Custom domain and follow GitHub's DNS instructions.

## How to update things

Logo: replace assets/logo.png, assets/favicon.png and assets/apple-touch-icon.png with your new files (keep the same file names).

Qui