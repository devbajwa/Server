const express = require("express");
const cors = require("cors");
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => res.type('html').send(html));

app.post('/api/saveRecipe', async (req, res) => {
    const data = req.body;
    try {
     await fs.writeFile('./data/recipes.json', JSON.stringify(data));
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving data' });
    }
  });
  
  app.get('/api/getRecipes', async (req, res) => {
    try {
      const fileData = await fs.readFile('./data/recipes.json', 'utf-8');
      const jsonData = JSON.parse(fileData);
      res.status(200).json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting data' });
    }
  });

  app.get('/api/getRecipe/:id', async (req, res) => {
    try {
      const fileData = await fs.readFile('./data/recipes.json', 'utf-8');
      const jsonData = JSON.parse(fileData);
      const recipe = jsonData.find(recipe => recipe.id === parseInt(req.params.id));

      if(recipe) {
        res.status(200).json(recipe);
      }else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting data' });
    }
  });


const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Dev Bajwa Server API</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="shortcut icon" href="/favicon.ico">
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
        color: #333;
      }
      body {
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 95dvh;
        justify-content: space-between;
      }
      section {
        padding: 1em;
      }
      li{
        margin-bottom: 0.25rem;
      }
      section span{
        font-size: 0.6rem;
        background: #f6f6f6;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25em;
      }
      footer{
        text-align: center;
        padding: 1em;
        font-size: calc(6rem / 16);
        background: #f6f6f6;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <section>
      <h1>Welcome to Dev Bajwa Server</h1>
      <p>This is the Express Server which serves as an API.</p>
      <p>It has two end points.</p>
      <ul>
        <li>Get Recipes <span><code><a href="/api/getRecipes" target="_blank">/api/getRecipes</a></code></span></li>
        <li>Save Recipe <span><code>/api/saveRecipe</code></span></li>
      </ul>
    </section>
    <footer>Waqas Naeem Bajwa - Front End Developer</footer>
  </body>
</html>
`