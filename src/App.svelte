<script>
  import meetups from "./Meetups/meetups-store.js";

  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import Button from "./UI/Button.svelte";

  let editMode;
  let page = "overview";
  let pageData = {};

  const addMeetup = (e) => {
    editMode = null;
  };

  const cancelEdit = () => {
    editMode = null;
  };

  const showDetails = (e) => {
    page = "details";
    pageData.id = e.detail;
  };

  const closeDetails = () => {
    page = "overview";
    pageData = {};
  };
</script>

<Header />

<main>
  {#if page === "overview"}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = "add")}>New Meetup</Button>
    </div>

    {#if editMode === "add"}
      <EditMeetup on:addMeetup={addMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid meetups={$meetups} on:showDetails={showDetails} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
