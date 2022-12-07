import { writable } from 'svelte/store';

const meetups = writable([
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
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavourite: false,
    };

    meetups.update((items) => {
      return [newMeetup, ...items];
    });
  },
  togleFavourite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };

      updatedMeetup.isFavourite = !updatedMeetup.isFavourite;

      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];

      updatedMeetups[meetupIndex] = updatedMeetup;

      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
