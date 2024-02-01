<?php

// Customize routes whatever you like 💡
Flight::route('*', function () {
  Flight::render('layouts/base');
});
