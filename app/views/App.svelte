<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";

  // Declares a component prop, it takes the value of main.js:5 name: 'World'
  export let name = "";

  // Local state
  let flightVersion = "";
  let svelteVersion = "";
  let loggedUser = {};

  // It executes each time a component instance is created before render
  fetch("./api/versions")
    .then((response) => response.json())
    .then((body) => {
      flightVersion = body[0];
      svelteVersion = body[1];
    });

  fetch("./api/auth")
    .then((response) => response.json())
    .then((body) => {
      loggedUser = body;
    });
</script>

<Router basepath={document.baseURI.replace(location.origin, "")}>
  <main>
    <h1>Hello {name}!</h1>
    <nav>
      <Link to="./">Home</Link>
      <Link to="./about">About</Link>
      {#if loggedUser.isLogged}
        <a href="./logout">Logout</a>
      {:else}
        <Link to="./login">Login</Link>
      {/if}
    </nav>
    <div>
      <Route path="/">
        <Home {loggedUser} />
      </Route>
      <Route path="/about">
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
