<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "some description",
      imageURL: "https://delaygram.andyjacko.com/images/pp/vader-pp.jpg",
      address: "123 A Road, Somewhere, M1 2BC",
      contactEmail: "contact@meetup.com",
      isFavourite: false,
    },
    {
      id: "m2",
      title: "Flying bootcamp",
      subtitle: "Learn to fly in 30 minutes",
      description: "some description",
      imageURL: "https://delaygram.andyjacko.com/images/pp/vader-pp.jpg",
      address: "123 A Road, Somewhere, M1 2BC",
      contactEmail: "contact@meetup.com",
      isFavourite: false,
    },
  ];

  let editMode;

  const addMeetup = (e) => {
    const newMeetup = {
      id: Math.random().toString(),
      title: e.detail.title,
      subtitle: e.detail.subtitle,
      address: e.detail.address,
      imageURL: e.detail.imageURL,
      description: e.detail.description,
      contactEmail: e.detail.contactEmail,
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  };

  const toggleFavourite = (e) => {
    const id = e.detail;
    const updatedMeetup = { ...meetups.find((m) => m.id === id) };

    updatedMeetup.isFavourite = !updatedMeetup.isFavourite;

    const meetupIndex = meetups.findIndex((m) => m.id === id);
    const updatedMeetups = [...meetups];

    updatedMeetups[meetupIndex] = updatedMeetup;

    meetups = updatedMeetups;
  };
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = "add")}>New Meetup</Button>
  </div>

  {#if editMode === "add"}
    <EditMeetup on:addMeetup={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavourite={toggleFavourite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
