<script>
  export let name = "";
  export let root = "";
  let flightVersion = "";
  let svelteVersion = "";
  let loggedUser = {};

  fetch(`${root}/api/versions`)
    .then((response) => response.json())
    .then((body) => {
      flightVersion = body[0];
      svelteVersion = body[1];
    });

  fetch(`${root}/api/auth`)
    .then((response) => response.json())
    .then((body) => {
      loggedUser = body;
    });

  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
</script>

<Router>
  <main>
    <h1>Hello {name}!</h1>
    <nav>
      <Link to="{root}/">
        <a href="{root}/">Home</a>
      </Link>
      <Link to="{root}/about">
        <a href="{root}/about">About</a>
      </Link>
      {#if loggedUser.isLogged}
        <a href="{root}/logout">Logout</a>
      {:else}
        <Link to="{root}/login">
          <a href="{root}/login">Login</a>
        </Link>
      {/if}
    </nav>
    <div>
      <Route primary={false} path="{root}/">
        <Home {loggedUser} />
      </Route>
      <Route primary={false} path="{root}/about">
        <About {flightVersion} {svelteVersion} />
      </Route>
      <Route component={Login} path="{root}/login" />
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
