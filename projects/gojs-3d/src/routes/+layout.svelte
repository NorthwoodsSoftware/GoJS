<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<!-- Northwoods google analytics - You can delete this block! -->
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-S5QK8VSK84"></script>
  <script>
    if (location.href.includes('gojs.net')) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-S5QK8VSK84');
    }
  </script>
</svelte:head>
<!-- end of analytics -->

{@render children()}
