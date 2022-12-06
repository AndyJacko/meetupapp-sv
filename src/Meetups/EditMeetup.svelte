<script>
  import { createEventDispatcher } from "svelte";

  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let imageURL = "";
  let description = "";
  let contactEmail = "";

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch("addMeetup", {
      title,
      subtitle,
      address,
      imageURL,
      description,
      contactEmail,
    });
  };

  const cancel = () => {
    dispatch("cancel");
  };
</script>

<Modal title="Edit Meetup" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput id="title" label="Title" value={title} on:input={(e) => (title = e.target.value)} />
    <TextInput id="subtitle" label="Subtitle" value={subtitle} on:input={(e) => (subtitle = e.target.value)} />
    <TextInput id="address" label="Address" value={address} on:input={(e) => (address = e.target.value)} />
    <TextInput id="imageURL" label="Image URL" value={imageURL} on:input={(e) => (imageURL = e.target.value)} />
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
      value={contactEmail}
      on:input={(e) => (contactEmail = e.target.value)}
    />
  </form>

  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
