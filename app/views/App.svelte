<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import { BASE_URL } from "./consts";

  export let name = "";
  let flightVersion = "";
  let svelteVersion = "";
  let loggedUser = {};

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

<Router>
  <main>
    <h1>Hello {name}!</h1>
    <nav>
      <Link to="{BASE_URL}/">
        <a href="{BASE_URL}/">Home</a>
      </Link>
      <Link to="{BASE_URL}/about">
        <a href="{BASE_URL}/about">About</a>
      </Link>
      {#if loggedUser.isLogged}
        <a href="{BASE_URL}/logout">Logout</a>
      {:else}
        <Link to="{BASE_URL}/login">
          <a href="{BASE_URL}/login">Login</a>
        </Link>
      {/if}
    </nav>
    <div>
      <Route primary={false} path="{BASE_URL}/">
        <Home {loggedUser} />
      </Route>
      <Route primary={false} path="{BASE_URL}/about">
        <About {flightVersion} {svelteVersion} />
      </Route>
      <Route component={Login} path="{BASE_URL}/login" />
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
