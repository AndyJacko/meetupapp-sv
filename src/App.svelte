<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let imageURL = "";
  let description = "";
  let contactEmail = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "some description",
      imageURL: "https://delaygram.andyjacko.com/images/pp/vader-pp.jpg",
      address: "123 A Road, Somewhere, M1 2BC",
      contactEmail: "contact@meetup.com",
    },
    {
      id: "m2",
      title: "Flying bootcamp",
      subtitle: "Learn to fly in 30 minutes",
      description: "some description",
      imageURL: "https://delaygram.andyjacko.com/images/pp/vader-pp.jpg",
      address: "123 A Road, Somewhere, M1 2BC",
      contactEmail: "contact@meetup.com",
    },
  ];

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
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>

    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>

    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>

    <div class="form-control">
      <label for="imageURL">Image URL</label>
      <input type="text" id="imageURL" bind:value={imageURL} />
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea rows="3" id="description" bind:value={description} />
    </div>

    <div class="form-control">
      <label for="contactEmail">Contact Email</label>
      <input type="email" id="contactEmail" bind:value={contactEmail} />
    </div>

    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
