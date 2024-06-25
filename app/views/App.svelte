<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import { BASE_URL } from "./consts";

  // Declares a component prop, it takes the value of main.js:5 name: 'World'
  export let name = "";

  // Local state
  let flightVersion = "";
  let svelteVersion = "";
  let loggedUser = {};

  // It executes each time a component instance is created before render
  fetch(`${BASE_URL}/api/versions`)
    .then((response) => response.json())
    .then((body) => {
      flightVersion = body[0];
      svelteVersion = body[1];
    });

  fetch(`${BASE_URL}/api/auth`)
    .then((response) => response.json())
    .then((body) => {
      loggedUser = body;
    });
</script>

<Router basepath={BASE_URL}>
  <main>
    <h1>Hello {name}!</h1>
    <nav>
      <Link to="/">
        <a href="/">Home</a>
      </Link>
      <Link to="/about">
        <a href="/about">About</a>
      </Link>
      {#if loggedUser.isLogged}
        <a href="/logout">Logout</a>
      {:else}
        <Link to="/login">
          <a href="/login">Login</a>
        </Link>
      {/if}
    </nav>
    <div>
      <Route primary={false} path="/">
        <Home {loggedUser} />
      </Route>
      <Route primary={false} path="/about">
        <About {flightVersion} {svelteVersion} />
      </Route>
      <Route component={Login} path="/login" />
    </div>
  </main>
</Router>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
