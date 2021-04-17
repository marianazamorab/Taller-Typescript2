import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var studentTbody = document.getElementById('student');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredit = document.getElementById("button-filterByCredit");
var btnfilterByCreditMin = document.getElementById("button-filterByCreditMin");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditMin.onclick = function () { return applyFilterByCreditsMin(); };
btnfilterByCredit.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderStudentInTable(student) {
    console.log('Desplegando informacion');
    student.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.information + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(Number(text), dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(creditKey, courses) {
    return creditKey === null ? dataCourses : courses.filter(function (c) {
        return c.credits <= (creditKey);
    });
}
function applyFilterByCreditsMin() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditsMin(Number(text), dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditsMin(creditKey, courses) {
    return creditKey === null ? dataCourses : courses.filter(function (c) {
        return c.credits >= (creditKey);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
