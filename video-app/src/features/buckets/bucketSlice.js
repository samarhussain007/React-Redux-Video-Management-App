import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialBuckets = [
  {
    id: nanoid(),
    text: "Sports",
    cards: [
      {
        id: nanoid(),
        title: "Ronaldo best moments",
        link: "https://www.youtube.com/embed/fJLrfALZGmE",
        description: "Posted 5 months ago",
        increase: "100k",
      },
    ],
  },
  {
    id: nanoid(),
    text: "Gaming",
    cards: [
      {
        id: nanoid(),
        title: "Valorant - 1v5 clutch",
        link: "https://www.youtube.com/embed/TUcMFLnZUjw",
        description: "Posted 5 months ago",
        increase: "50k",
      },
    ],
  },
  {
    id: nanoid(),
    text: "Education",
    cards: [
      {
        id: nanoid(),
        title: "Unreal Engine 5.2",
        link: "https://www.youtube.com/embed/qLGmj86-j4k",

        description: "Posted 5 months ago",
        increase: "200k",
      },
      {
        id: nanoid(),
        title: "Neetcode System Design",
        link: "https://www.youtube.com/embed/i53Gi_K3o7I",
        description: "Posted 5 months ago",
        increase: "10k",
      },
      {
        id: nanoid(),
        title: "Rust in 100 seconds",
        link: "https://www.youtube.com/embed/5C_HPTJg5ek",
        description: "Posted 5 months ago",
        increase: "70k",
      },
    ],
  },
  {
    id: nanoid(),
    text: "Songs",
    cards: [
      {
        id: nanoid(),
        title: "WeekEnd - Starboy",
        link: "https://www.youtube.com/embed/34Na4j8AVgA",
        description: "Posted 5 months ago",
        increase: "110k",
      },
      {
        id: nanoid(),
        title: "NF - Story",
        link: "https://www.youtube.com/embed/XSAGLJckRWM",
        description: "Posted 5 months ago",
        increase: "100k",
      },
    ],
  },
];
export const bucketSlice = createSlice({
  name: "bucket",
  initialState: {
    initialBuckets,
  },
  reducers: {
    addBuckets: (state, action) => {
      state.initialBuckets.push(action.payload);
    },
    editBucketName: (state, action) => {
      const { editedName, id } = action.payload;
      const bucket = state.initialBuckets.find((bucket) => bucket.id === id);
      if (bucket) {
        bucket.text = editedName;
      }
    },
    deleteBucket: (state, action) => {
      const { id } = action.payload;
      state.initialBuckets = state.initialBuckets.filter(
        (bucket) => bucket.id !== id
      );
    },
    addCard: (state, action) => {
      const { bucketName, card } = action.payload;
      const bucket = state.initialBuckets.find(
        (bucket) => bucket.text.toLowerCase() === bucketName
      );
      if (bucket) {
        bucket.cards.push(card);
      }
    },

    deleteCard: (state, action) => {
      const { bucketName, cardId } = action.payload;
      const bucket = state.initialBuckets.find(
        (bucket) => bucket.text.toLowerCase() === bucketName
      );
      if (bucket) {
        bucket.cards = bucket.cards.filter((card) => card.id !== cardId);
      }
    },
    updateCard: (state, action) => {
      const { bucketName, card } = action.payload;
      const bucket = state.initialBuckets.find(
        (bucket) => bucket.text.toLowerCase() === bucketName
      );
      if (bucket) {
        const cardIndex = bucket.cards.findIndex((card) => card.id === card.id);
        if (cardIndex !== -1) {
          bucket.cards[cardIndex] = card;
        }
      }
    },
  },
});

export const {
  addBuckets,
  editBucketName,
  deleteBucket,
  addCard,
  deleteCard,
  updateCard,
} = bucketSlice.actions;

export default bucketSlice.reducer;
