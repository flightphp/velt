<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title><?= $title ?? 'Svelte app' ?></title>
    <base href="<?= str_replace('index.php', '', $_SERVER['SCRIPT_NAME']) ?>" />
    <link rel="icon" href="./favicon.png" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="stylesheet" href="./build/bundle.css">
    <script defer src="./build/bundle.js"></script>
  </head>
  <body>
    <!-- Here will be rendered App.svelte, check main.js ➡ target -->
  </body>
</html>
