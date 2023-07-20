<script>
  import { onMount } from 'svelte';
  
  let imgSrc = "";
  
  async function getImgSrc() {
    const result = await fetch("/api/getOxrGif")
      .then(resp => resp.json());
    console.log(result);
    imgSrc = result;
  }
</script>

<img src={imgSrc}>
<button on:click={getImgSrc}>Update</button>

<style>
</style>