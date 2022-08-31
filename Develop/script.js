var workDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: 'am',
        reminder: "",
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: 'am',
        reminder: "",
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: 'am',
        reminder: "",
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: 'pm',
        reminder: "",
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: 'pm',
        reminder: "",
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: 'pm',
        reminder: "",
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: 'pm',
        reminder: "",
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: 'pm',
        reminder: "",
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: 'pm',
        reminder: "",
    },
]

//gets date
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

//saves info to local storage
function saveInfo() {
    localStorage.setItem("workDay", JSON.stringify(workDay));
}

function displayInfo() {
    workDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("workDay"));

    if (storedDay) {
        workDay = storedDay;
    }

    saveInfo();
    displayInfo();
}

getHeaderDate();
//creates rows for time slots
workDay.forEach(function(thisHour) {
    var timeSlotRows = $("<form>").attr({
        "class": "row"
    });
    $("container").append(timeSlotRows);

    var displayHours = $("<div>")
    .text(`${thisHour.hour}${thisHour.meridiem}`)
    .attr({
        "class": "col-md-2 hour"
    });

    var hourPlan = $("<div>")
    .attr({
        "class": "col-md-9 description p-0"
    });
//sets past, present or futre classes
    var classesData = $("<textarea>");
displayHours.append(classesData);
classesData.attr("id", thisHour.id);
if (thisHour.time < moment().format("HH")) {
    classesData.attr ({
        "class": "past",
    })
} else if (thisHour.time === moment().format("HH")) {
    classesData.attr ({
        "class": "present",
    })
} else if (thisHour.time > moment().format("HH")) {
    classesData.attr ({
        "class": "future"
    })
}

//save button
var saveButton = $("<i class='far fa-save fa-lg'></i>")
var savePlan = $("<button>")
.attr({
    "class": "col-md-1 saveBtn"
});
savePlan.append(saveButton);
timeSlotRows.append(displayHours, hourPlan, savePlan);
})
debugger
init();

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    workDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveInfo();
    displayInfo();
})