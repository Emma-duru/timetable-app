const addCourseBtn = $(".add-course");

class Course {
    constructor(id, name, lecturer, day, length, start, venue, row) {
        this.id = id;
        this.name = name;
        this.lecturer = lecturer;
        this.day = day;
        this.length = length;
        this.start = start;
        this.venue = venue;
        this.row = row;
    }
}


// To Display Courses
$(document).ready(() => {
    displayCourses();
});

const displayCourses = () => {
    let courses = getCoursesFromStorage();
    courses.forEach((course) => {
        addCourseToUI(course);
    })
}

const getCoursesFromStorage = () => {
    let courses;
    if (localStorage.getItem('courses') === null) courses = [];
    else courses = JSON.parse(localStorage.getItem('courses'));
    return courses;
}


// To Add Course
addCourseBtn.on("click", (e) => {
    e.preventDefault();
    
    const courseName = $(".course-code").val();
    const lecturerName =  $(".lecturer").val();
    const venue = $(".venue").val();
    const day = $(".day").val();
    const startTimeValue = $(".start-time").val();
    const courseLength = (startTimeValue === "15") ? "1" : $(".length").val();
    const tableRow = `#${day} .${startTimeValue}`;
    const courseId = new Date().getTime();

    const course = new Course(courseId, courseName, lecturerName, day, 
        courseLength, startTimeValue, venue, tableRow);

    addCourseToUI(course);
    addCourseToStorage(course);
})

// To Add Course to UI
const addCourseToUI = (course) => {
    const tableData = `
        <div>
            <p>${course.name}</p>
            <small class="text-muted">by ${course.lecturer}</small>
            <small class="text-muted">at ${course.venue}</small><br>
            <small class="btn btn-secondary btn-sm edit ${course.id}">Edit</small>
            <small class="btn btn-danger btn-sm delete ${course.id}">&times;</small>
        </div>
    `;
    $(course.row).html(tableData);
    $(course.row).attr("colSpan", `${course.length}`);
    (course.length > 1) ? $(course.row).next().remove() : "";
    $("#table-form").trigger("reset");
}

// To Add Course to Storage
const addCourseToStorage = (course) => {
    courses = getCoursesFromStorage();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
}


// Th Edit Course
$("td").click((e) => {
    if($(e.target).hasClass("edit")) {
        
    }
})


// To Delete Course
$("td").click((e) => {
    if($(e.target).hasClass("delete")) {
        deleteCourseFromUI(e);
        deleteCourseFromStorage(e);
    }
})

// Delete Course from UI
const deleteCourseFromUI = (element) => {
    const tableData = $(element.target).closest("td");
    const tableDataSpan = $(tableData).attr("colSpan");
    if (tableDataSpan > 1) {
        const tableDataClass = 1 + Number(tableData.attr("class"));
        $(tableData).attr("colSpan", "1");
        $(tableData).after(`<td class="${tableDataClass}"></td>`);
    }

    $(element.target).closest("div").remove();
}

// Delete Course from Storage
const deleteCourseFromStorage = (element) => {
    let courses = getCoursesFromStorage();
    courses.forEach((course, index) => {
        if($(element.target).hasClass(course.id)) courses.splice(index, 1);
    })
    localStorage.setItem("courses", JSON.stringify(courses));
}


// Download as PDF
$(".toPDF").click(() => {
    const htmlElement = $(".html-to-pdf").html();
    html2pdf()
        .set({ html2canvas: { 
            scale: 4,
        } })
        .from(htmlElement)
        .save("timetable.pdf");
});


// Logout
$(".logout").click(() => {$(location).attr("href", "index.html");})

