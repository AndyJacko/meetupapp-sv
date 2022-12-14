<script>
  import { createEventDispatcher } from "svelte";

  import meetups from "./meetups-store.js";

  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let imageURL;
  export let description;
  export let address;
  export let contactEmail;
  export let isFavourite;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  const toggleFavourite = () => {
    isLoading = true;

    fetch(`https://meetups-sv-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavourite: !isFavourite }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }

        isLoading = false;
        meetups.togleFavourite(id);
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  };
</script>

<article>
  <header>
    <h1>
      {title}

      {#if isFavourite}
        <Badge>FAVOURITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>

  <div class="image">
    <img src={imageURL} alt={title} />
  </div>

  <div class="content">
    <p>{description}</p>
  </div>

  <footer>
    <Button mode="outline" on:click={() => dispatch("edit", id)}>Edit</Button>
    <Button mode="outline" on:click={() => dispatch("showDetails", id)}>Show Details</Button>

    {#if isLoading}
      <span>Updating...</span>
    {:else}
      <Button mode="outline" colour={isFavourite ? null : "success"} on:click={toggleFavourite}>
        {isFavourite ? "Unfavourite" : "Favourite"}
      </Button>
    {/if}
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
