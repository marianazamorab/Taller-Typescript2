import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let studentTbody: HTMLElement = document.getElementById('student')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCredit")!;
const btnfilterByCreditMin: HTMLElement = document.getElementById("button-filterByCreditMin")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditMin.onclick = () => applyFilterByCreditsMin();
btnfilterByCredit.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentInTable(student: Student[]): void {
  console.log('Desplegando informacion');
  student.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.name}</td>
                           <td>${student.information}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByCredits() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(Number(text), dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(creditKey: number, courses: Course[]) {
  return creditKey === null ? dataCourses : courses.filter( c => 
    c.credits<=(creditKey));
}

function applyFilterByCreditsMin() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditsMin(Number(text), dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditsMin(creditKey: number, courses: Course[]) {
  return creditKey === null ? dataCourses : courses.filter( c => 
    c.credits>=(creditKey));
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

btnfilterByName.onclick = () => applyFilterByName();

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}