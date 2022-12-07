<script>
  import meetups from "./Meetups/meetups-store.js";

  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import Error from "./UI/Error.svelte";
  import Spinner from "./UI/Spinner.svelte";

  let editMode;
  let editId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error;

  fetch("https://meetups-sv-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed!");
      }

      return res.json();
    })
    .then((data) => {
      const loadedMeetups = [];

      for (const key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }

      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 1000);
    })
    .catch((err) => {
      error = err;
      isLoading = false;
    });

  const saveMeetup = () => {
    editMode = null;
    editId = null;
  };

  const cancelEdit = () => {
    editMode = null;
    editId = null;
  };

  const showDetails = (e) => {
    page = "details";
    pageData.id = e.detail;
  };

  const closeDetails = () => {
    page = "overview";
    pageData = {};
  };

  const startEdit = (e) => {
    editMode = "edit";
    editId = e.detail;
  };

  const clearError = () => {
    error = null;
  };
</script>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <EditMeetup id={editId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}

    {#if isLoading}
      <Spinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showDetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = "edit";
        }}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
