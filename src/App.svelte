<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";

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
    <TextInput id="title" label="Title" type="text" value={title} on:input={(e) => (title = e.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      type="text"
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput id="address" label="Address" type="text" value={address} on:input={(e) => (address = e.target.value)} />
    <TextInput
      id="imageURL"
      label="Image URL"
      type="text"
      value={imageURL}
      on:input={(e) => (imageURL = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      rows="3"
      value={description}
      on:input={(e) => (description = e.target.value)}
    />
    <TextInput
      id="contactEmail"
      label="Contact Email"
      type="email"
      value={contactEmail}
      on:input={(e) => (contactEmail = e.target.value)}
    />

    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
