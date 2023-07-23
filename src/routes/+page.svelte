<script>
  import { onMount } from 'svelte';
  import { dateToday, dateYesterday } from '$lib/utils/datetime';

  const today = dateToday().toLocaleString("ru-RU");
  const yesterday = dateYesterday().toLocaleString("ru-RU");

  let course1 = 0;
  let course2 = 0;
  let imgSrc;

  async function getImgSrc() {
    const result = await fetch("/api/getOxrGif",
      { currency: "rub" }
    ).then(resp =>
      (resp.status === 200? resp.json(): "")
    );
    course1 = result?.course1 ?? 0;
    course2 = result?.course2 ?? 0;
    imgSrc = result?.gifurl;
  }
</script>


<div class="column">
  <img src={imgSrc ?? ""}>
  <table>
    <tr><td>Date</td><td>Course ({course1.currency ?? ""})</td></tr>
    <tr><td>{today}</td><td>{course1.course ?? ""}</td></tr>
    <tr><td>{yesterday}</td><td>{course2.course ?? ""}</td></tr>
  </table>
  <button on:click={getImgSrc}>Update</button>
</div>

<style>
  .column {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 300px;
    margin-bottom: 0.5rem;
  }
  table, td {
    border: 1px solid black;
    border-collapse: collapse;
    width: fit-content;
  }
  table {
    margin-bottom: 0.5rem;
  }
  td {
    padding: 0.25rem;
  }
  button {
    width: fit-content;
  }
</style>