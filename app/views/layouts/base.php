<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= $title ?? 'Svelte app' ?></title>
    <link rel="icon" type="image/png" href="<?= root() ?>/favicon.png" />
    <link rel="stylesheet" href="<?= root() ?>/global.css" />
    <link rel="stylesheet" href="<?= root() ?>/build/bundle.css">
    <script defer src="<?= root() ?>/build/bundle.js"></script>
  </head>
  <body>
    <!-- Here will be rendered App.svelte, check main.js ➡ target -->
  </body>
</html>
