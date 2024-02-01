<script>
  export let name = "";
  export let root = "";
  let flightVersion = "";

  fetch(`${root}/api/flight/version`)
    .then((response) => response.text())
    .then((body) => {
      flightVersion = body;
    });

  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
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
    </nav>
    <div>
      <Route component={Home} path="{root}/" />
      <Route path="{root}/about">
        <About {flightVersion} />
      </Route>
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
