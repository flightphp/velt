<script>
  export let loggedUser = {};
</script>

{#if loggedUser.isLogged}
  <h2>Welcome {loggedUser.email}</h2>
{/if}

<p>
  Visit the <a href="https://docs.flightphp.com">FlightPHP tutorial</a>
  to learn how to build FlightPHP APIs.
</p>

<p>
  Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how
  to build Svelte apps.
</p>
