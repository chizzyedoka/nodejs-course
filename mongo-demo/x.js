// modelling relationships

// Using References (Normalization) -> CONSISTENCY
let author = {
  name: "Chisom Edoka",
}; //  collection for storing authors

let course = {
  author: "id", // id of author given by mongoDB
}; // colection of courses

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: "Chisom Edoka",
  },
};

//  Hybrid
let author = {
  name: "chisom",
  // 50 other properties
};

let course = {
  author: {
    id: "ref",
    name: "Chisom",
  },
};
