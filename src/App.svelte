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

  const addMeetup = () => {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      address,
      imageURL,
      description,
      contactEmail,
    };

    meetups = [newMeetup, ...meetups];
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
  <Button caption="New Meetup" on:click={() => (editMode = "add")} />

  {#if editMode === "add"}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:toggleFavourite={toggleFavourite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
