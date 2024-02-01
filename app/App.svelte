<script>
  export let name = "";
  export let root = "";

  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
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
      <Route path="{root}/">
        <Home />
      </Route>
      <Route component={About} path="{root}/about" />
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
