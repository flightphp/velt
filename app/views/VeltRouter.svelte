<script>
  import { Router } from "svelte-routing";
</script>

<Router basepath={document.baseURI.replace(location.origin, "")}>
  <slot />
</Router>
