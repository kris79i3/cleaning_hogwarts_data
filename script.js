"use strict";

const endpoint = "https://petlatkea.dk/2020/hogwarts/students.json";
let students = [];

document.addEventListener("DOMContentLoaded", start);

async function start() {
  const response = await fetch(endpoint);
  students = await response.json();
  showStudents();
}

function showStudents() {
  console.log(students);
}

// firstName;
// middleName;
// lastName;

// arr;

// arr.forEach((letter, i) => {
//   if (arr[i - 1] === " " || arr[i - 1] === "-" || arr[i - 1] === ",") {
//     arr[i] = letter.toUpperCase();
//   } else {
//     arr[i] = letter.toLowerCase();
//   }
// });

// arr.join("");
