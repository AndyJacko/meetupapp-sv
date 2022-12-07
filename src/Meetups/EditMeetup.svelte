<script>
  import { createEventDispatcher } from "svelte";

  import meetups from "./meetups-store.js";
  import { isEmpty, isEmail } from "../helpers/validation.js";

  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let id = null;

  let title = "";
  let subtitle = "";
  let address = "";
  let imageURL = "";
  let description = "";
  let contactEmail = "";

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);

      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      imageURL = selectedMeetup.imageURL;
      description = selectedMeetup.description;
      contactEmail = selectedMeetup.contactEmail;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: imageURLValid = !isEmpty(imageURL);
  $: descriptionValid = !isEmpty(description);
  $: contactEmailValid = isEmail(contactEmail);

  $: formIsValid =
    titleValid && subtitleValid && addressValid && imageURLValid && descriptionValid && contactEmailValid;

  const submitForm = () => {
    const meetupData = {
      title,
      subtitle,
      address,
      imageURL,
      description,
      contactEmail,
    };

    if (id) {
      meetups.updateMeetup(id, meetupData);
    } else {
      meetups.addMeetup(meetupData);
    }

    dispatch("save");
  };

  const deleteMeetup = () => {
    meetups.deleteMeetup(id);
    dispatch("save");
  };

  const cancel = () => {
    dispatch("cancel");
  };
</script>

<Modal title="{id ? 'Edit' : 'Add'} Meetup" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={(e) => (address = e.target.value)}
    />
    <TextInput
      id="imageURL"
      label="Image URL"
      valid={imageURLValid}
      validityMessage="Please enter a valid image URL."
      value={imageURL}
      on:input={(e) => (imageURL = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      controlType="textarea"
      rows="3"
      bind:value={description}
    />
    <TextInput
      id="contactEmail"
      label="Contact Email"
      valid={contactEmailValid}
      validityMessage="Please enter a valid contact email."
      value={contactEmail}
      on:input={(e) => (contactEmail = e.target.value)}
    />
  </form>

  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button disabled={!formIsValid} on:click={submitForm}>Save</Button>

    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
