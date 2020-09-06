"use strict";

document.addEventListener("DOMContentLoaded", start);

const endpoint = "https://petlatkea.dk/2020/hogwarts/students.json";
let arr = [];
const cleanData = [];
const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  image: "",
  house: "",
};

async function start() {
  const response = await fetch(endpoint);
  arr = await response.json();
  prepareObjects();
}

function prepareObjects() {
  // console.log(arr);

  arr.forEach((jsonObject) => {
    const student = Object.create(Student);

    //firstName
    if (jsonObject.fullname.includes(" ")) {
      student.firstName = jsonObject.fullname
        .trim()
        .substring(0, jsonObject.fullname.trim().indexOf(" "));
    } else {
      student.firstName = jsonObject.fullname.trim().substring("");
    }

    student.firstName =
      student.firstName.substring(0, 1).toUpperCase() +
      student.firstName.substring(1).toLowerCase();
    // console.log(student.firstName);

    //middleName
    if (jsonObject.fullname.includes('"')) {
      student.middleName = "";
    } else if (jsonObject.fullname.includes(" ")) {
      student.middleName = jsonObject.fullname
        .trim()
        .substring(
          jsonObject.fullname.trim().indexOf(" ") + 1,
          jsonObject.fullname.trim().lastIndexOf(" ") + 1
        );
    } else {
      student.middleName = "";
    }

    student.middleName =
      student.middleName.trimEnd().substring(0, 1).toUpperCase() +
      student.middleName.trimEnd().substring(1).toLowerCase();
    // console.log(student.middleName);

    //lastName
    if (jsonObject.fullname.includes("-")) {
      student.lastName = jsonObject.fullname.substring(
        jsonObject.fullname.lastIndexOf(" ") + 1
      );
    } else if (jsonObject.fullname.includes(" ")) {
      student.lastName = jsonObject.fullname
        .trim()
        .substring(jsonObject.fullname.trim().lastIndexOf(" ") + 1);

      student.lastName =
        student.lastName.substring(0, 1).toUpperCase() +
        student.lastName.substring(1).toLowerCase();
    } else {
      student.lastName = "";
    }

    // console.log(student.lastName);

    //nickName
    student.nickName = jsonObject.fullname.substring(
      jsonObject.fullname.indexOf('"') + 1,
      jsonObject.fullname.lastIndexOf('"')
    );

    // console.log(student.nickName);

    //house
    student.house =
      jsonObject.house.trim().substring(0, 1).toUpperCase() +
      jsonObject.house.trim().substring(1).toLowerCase();
    // console.log(student.house);

    //images
    const fileLastName = student.lastName.toLowerCase();
    const firstCharName = student.firstName[0].toLowerCase();

    if (fileLastName.includes("-")) {
      student.image =
        fileLastName.substring(fileLastName.indexOf("-") + 1) +
        "_" +
        firstCharName +
        ".png";
    } else if (jsonObject.fullname.includes(" ")) {
      student.image = `${fileLastName}_${firstCharName}.png`;
    } else {
      student.image = "";
    }
    // console.log(student);
    cleanData.push(student);
  });

  console.table(cleanData);
}

// arr.forEach((letter, i) => {
//   if (arr[i - 1] === " " || arr[i - 1] === "-" || arr[i - 1] === ",") {
//     arr[i] = letter.toUpperCase();
//   } else {
//     arr[i] = letter.toLowerCase();
//   }
// });

// arr.join("");
