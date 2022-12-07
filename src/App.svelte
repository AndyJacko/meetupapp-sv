<script>
  import meetups from "./Meetups/meetups-store.js";

  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import Button from "./UI/Button.svelte";

  let editMode;
  let editId;
  let page = "overview";
  let pageData = {};

  const saveMeetup = (e) => {
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
</script>

<Header />

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <EditMeetup id={editId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showDetails={showDetails}
      on:edit={startEdit}
      on:add={() => {
        editMode = "edit";
      }}
    />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
