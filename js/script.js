const header =
  "<nav class='navbar navbar-expand-lg navbar-dark bg-primary'>" +
  "<div class='container-fluid'>" +
  "<a href='https://peoplecerteducation.org/bootcamp/' target='_blank'><img class='logo'" +
  "src='images/peoplecert.png' /></a>" +
  "<button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor01'" +
  "aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>" +
  "<span class='navbar-toggler-icon'></span>" +
  "</button>" +
  "<div class='collapse navbar-collapse' id='navbarColor01'>" +
  "<ul class='navbar-nav me-auto'>" +
  "<li class='nav-item active'>" +
  "<a class='nav-link navItemTextSize' href='index.html'>Αρχική</a>" +
  "</li>" +
  "<li class='nav-item dropdown navItemTextSize'>" +
  "<a class='nav-link dropdown-toggle' data-bs-toggle='dropdown' href='#' role='button'" +
  "aria-haspopup='true' aria-expanded='false'>Οντότητες</a>" +
  "<div class='dropdown-menu center'>" +
  "<a class='dropdown-item dropdownTextSize' href='courses.html'>Μαθήματα</a>" +
  "<a class='dropdown-item dropdownTextSize' href='trainers.html'>Εκπαιδευτές</a>" +
  "<a class='dropdown-item dropdownTextSize' href='students.html'>Μαθητές</a>" +
  "<a class='dropdown-item dropdownTextSize' href='assignments.html'>Εργασίες</a>" +
  "</div>" +
  "</li>" +
  "<li class='nav-item dropdown navItemTextSize'>" +
  "<a class='nav-link dropdown-toggle' data-bs-toggle='dropdown' href='#' role='button'" +
  "aria-haspopup='true' aria-expanded='false'>Συσχετίσεις</a>" +
  "<div class='dropdown-menu center'>" +
  "<a class='dropdown-item dropdownTextSize' href='trainersPerCourse.html'>Εκπαιδευτές Ανά Μάθημα</a>" +
  "<a class='dropdown-item dropdownTextSize' href='studentsPerCourse.html'>Μαθητές Ανά Μάθημα</a>" +
  "<a class='dropdown-item dropdownTextSize' href='assignmentsPerCourse.html'>Εργασίες Ανά Μάθημα</a>" +
  "<a class='dropdown-item dropdownTextSize' href='assignmentsPerStudent.html'>Εργασίες Ανά Μαθητή</a>" +
  "</div>" +
  "</li>" +
  "</ul>" +
  "</div>" +
  "</div>" +
  "</nav>";

const footer =
  "<footer id='footer' class='bg-primary center'>" +
  "<span> PrivateSchool Forms </span>" +
  "</footer>";

//setarisma header
$("#divHeader").html(header);
//setarisma footer
$("#divFooter").html(footer);

function setCoursePicker() {
  startDate = new dtsel.DTS('input[name="startdate"]', {
    showDate: true,
    showTime: false,
    dateFormat: "dd-mm-yyyy",
    timeFormat: "HH:MM:SS",
  });
  endDate = new dtsel.DTS('input[name="enddate"]', {
    showDate: true,
    showTime: false,
    dateFormat: "dd-mm-yyyy",
    timeFormat: "HH:MM:SS",
  });
}

function setStudentPicker() {
  dob = new dtsel.DTS('input[name="dob"]', {
    showDate: true,
    showTime: false,
    dateFormat: "dd-mm-yyyy",
    timeFormat: "HH:MM:SS",
  });
}

function setAssignmentPicker() {
  sub = new dtsel.DTS('input[name="sub"]', {
    showDate: true,
    showTime: true,
    dateFormat: "dd-mm-yyyy",
    timeFormat: "HH:MM:SS",
  });
}

function showForm() {
  $("#divForm").slideDown("slow");
}

function clearAll() {
  $("tr").toggleClass("selected").removeClass("selected");
}

function hideForm() {
  //pathse eisagwgh
  $("#reset").click();
  $("#divForm").slideUp("slow");
  clearAll();
  $("#id").val("");
}

function hideWrongData() {
  clearAll();
  $("#id").val("");
  $("#form div").children().removeClass("is-invalid");
  resetNotifyMsgs();
}

function resetNotifyMsgs() {
  $("#startdateNotify").text("Η ημερομηνία έναρξης είναι υποχρεωτική !");
  $("#enddateNotify").text("Η ημερομηνία λήξης είναι υποχρεωτική !");
  $("#subNotify").text("Η ημερομηνία και ώρα παράδοσης είναι υποχρεωτική !");
}

function dateToday() {
  //shmerinh hmeromhnia
  let to = new Date();
  let day = to.getDate();
  let month = to.getMonth() + 1;
  let year = to.getFullYear();
  let today = new Date(month + "/" + day + "/" + year);
  return today;
}

//pairnei san eisodo ta ids ths kathe formas kai epistrefei tis times ths
//epishs energopoiei thn antistoixei klash gia to minima
function getFormData(elementsIds) {
  let isValid = true;
  let values = new Array();
  for (i = 0; i < elementsIds.length; i++) {
    values.push(
      $("#" + elementsIds[i])
        .val()
        .trim()
        .replace(/\s+/g, " ")
    );
    $("#" + elementsIds[i]).val(values[i]);
    if (values[i] == "") {
      $("#" + elementsIds[i]).addClass("is-invalid");
      isValid = false;
    } else {
      $("#" + elementsIds[i]).removeClass("is-invalid");
    }
  }
  return [isValid, values];
}

function validateCourseForm() {
  let elementsIds = ["title", "stream", "type", "startdate", "enddate"];
  let [isValid, values] = getFormData(elementsIds);
  //metatroph hmeromhniwn apo string se dates
  let stDate = values[3].split("-");
  let start = new Date(stDate[1] + "/" + stDate[0] + "/" + stDate[2]);
  let enDate = values[4].split("-");
  let end = new Date(enDate[1] + "/" + enDate[0] + "/" + enDate[2]);
  //autos o elegxos trexei mono gia eisagwgh mathimatos
  if (start < dateToday() && $("#id").val() == "" && values[3] != "") {
    $("#startdate").addClass("is-invalid");
    $("#startdateNotify").text(
      "Δεν γίνεται η ημερομηνία έναρξης να είναι μικρότερη από τη σημερινή !"
    );
    isValid = false;
  }
  if (end <= start) {
    $("#enddate").addClass("is-invalid");
    $("#enddateNotify").text(
      "Δεν γίνεται η ημερομηνία λήξης να είναι μικρότερη ή ίση από της αρχής !"
    );
    isValid = false;
  }
  return isValid;
}

function validateTrainerForm() {
  let elementsIds = ["fname", "lname", "subject"];
  let [isValid, values] = getFormData(elementsIds);
  return isValid;
}

//elegxei epipleons periorismous
function validateStudentForm() {
  let elementsIds = ["fname", "lname", "dob", "fees"];
  let [isValid, values] = getFormData(elementsIds);
  //ypologismos ilikias
  let dobYear = values[2].split("-")[2];
  let currentYear = dateToday().getFullYear();
  if (currentYear - dobYear < 18 || currentYear - dobYear < 0) {
    $("#dob").addClass("is-invalid");
    isValid = false;
  }
  if (values[3] < 0 || values[3] > 1000000) {
    $("#fees").addClass("is-invalid");
    isValid = false;
  }
  return isValid;
}

function validateAssignmentForm() {
  let elementsIds = ["title", "description", "sub", "oralmark", "totalmark"];
  let [isValid, values] = getFormData(elementsIds);
  //metatroph hmeromhniwn apo string se dates
  let strDate = values[2].split(",")[0].split("-");
  let strTime = values[2].split(",")[1];
  let subDate = new Date(
    strDate[1] + "/" + strDate[0] + "/" + strDate[2] + "," + strTime
  );
  //mono gia kainouria eggrafh to tsekarw
  if (subDate < new Date() && $("#id").val() == "" && values[2] != "") {
    $("#subNotify").text(
      "Δεν γίνεται η ημερομηνία υποβολής να είναι μικρότερη από τώρα !"
    );
    $("#sub").addClass("is-invalid");
    isValid = false;
  }
  return isValid;
}

function lockNumberFieldMouseWheel(id) {
  $("#" + id).on("wheel", function (event) {
    $(this).blur();
  });
}

function getNumFromCode(keyCode) {
  if (keyCode >= 48 && keyCode <= 57) {
    return String.fromCharCode(keyCode);
  } else {
    //numpad codes
    switch (keyCode) {
      case 96:
        return 0;
      case 97:
        return 1;
      case 98:
        return 2;
      case 99:
        return 3;
      case 100:
        return 4;
      case 101:
        return 5;
      case 102:
        return 6;
      case 103:
        return 7;
      case 104:
        return 8;
      case 105:
        return 9;
    }
  }
}

function setNumCheck(id) {
  $("#" + id).keydown(function (e) {
    var keyCode = e.which;
    if (e.shiftKey) {
      return false;
    } else if (
      keyCode > 31 &&
      (keyCode < 48 || keyCode > 57) &&
      (keyCode < 96 || keyCode > 105)
    ) {
      return false;
    }
    if (id == "oralmark") {
      //einai gia thn forma assignment
      return constraintAction(keyCode);
    }
  });
}

//peirazei ta pedia oral + total mark sthn forma assignment
function constraintAction(keyCode) {
  if (keyCode == 8) {
    //diagrafh xarakthra backspace
    var oral = $("#oralmark")
      .val()
      .substring(0, $("#oralmark").val().length - 1);
    if (parseInt(oral) > 100) {
      $("#oralmark").val(100);
      $("#totalmark").val(0);
      return false;
    } else {
      $("#totalmark").val(100 - parseInt(oral));
      return true;
    }
  } else {
    var oral = $("#oralmark").val() + getNumFromCode(keyCode);
    if (parseInt(oral) > 100) {
      $("#oralmark").val(100);
      $("#totalmark").val(0);
      return false;
    } else if (oral.length > 1 && parseInt(oral) == 0) {
      return false;
    } else {
      $("#totalmark").val(100 - parseInt(oral));
      return true;
    }
  }
}

function coursesTableClickable() {
  $("table tbody  tr").click(function () {
    //tropopoihsh
    //to data periexei ta stoixeia ths grammhs pou pathsa
    if ($(this).hasClass("selected")) {
      $("#cancel").click();
    } else {
      hideWrongData();
      $(this).toggleClass("selected").siblings().removeClass("selected");
      //to data periexei ta stoixeia ths grammhs pou pathsa
      let data = $(this).find("td");
      let formIds = ["id", "title", "stream", "type", "startdate", "enddate"];
      for (i = 0; i < formIds.length; i++) {
        if (i == 4 || i == 5) {
          //otan diabazei tis hmeromhnies
          //to allazw se dd-mm-yyyy gia na mporesei na to xrhsimopoihsei h validate
          let date = data.eq(i).text().replace(/\//g, "-");
          $("#" + formIds[i]).val(date);
        } else {
          $("#" + formIds[i]).val(data.eq(i).text());
        }
        showForm();
      }
    }
  });
}

function trainersTableClickable() {
  $("table tbody  tr").click(function () {
    //tropopoihsh
    //einai hdh epilegmeno
    if ($(this).hasClass("selected")) {
      $("#cancel").click();
    } else {
      hideWrongData();
      $(this).toggleClass("selected").siblings().removeClass("selected");
      //to data periexei ta stoixeia ths grammhs pou pathsa
      let data = $(this).find("td");
      let formIds = ["id", "fname", "lname", "subject"];
      for (i = 0; i < formIds.length; i++) {
        $("#" + formIds[i]).val(data.eq(i).text());
      }
      showForm();
    }
  });
}

function studentsTableClickable() {
  $("table tbody  tr").click(function () {
    //tropopoihsh
    //einai hdh epilegmeno
    if ($(this).hasClass("selected")) {
      $("#cancel").click();
    } else {
      hideWrongData();
      $(this).toggleClass("selected").siblings().removeClass("selected");
      //to data periexei ta stoixeia ths grammhs pou pathsa
      let data = $(this).find("td");
      let formIds = ["id", "fname", "lname", "dob", "fees"];
      for (i = 0; i < formIds.length; i++) {
        if (i == 3) {
          //otan diabazei tis hmeromhnies
          //to allazw se dd-mm-yyyy gia na mporesei na to xrhsimopoihsei h validate
          let date = data.eq(i).text().replace(/\//g, "-");
          $("#" + formIds[i]).val(date);
        } else {
          $("#" + formIds[i]).val(data.eq(i).text());
        }
      }
      showForm();
    }
  });
}

function assignmentsTableClickable() {
  $("table tbody  tr").click(function () {
    //tropopoihsh
    //einai hdh epilegmeno
    if ($(this).hasClass("selected")) {
      $("#cancel").click();
    } else {
      hideWrongData();
      $(this).toggleClass("selected").siblings().removeClass("selected");
      //to data periexei ta stoixeia ths grammhs pou pathsa
      let data = $(this).find("td");
      let formIds = [
        "id",
        "title",
        "description",
        "sub",
        "oralmark",
        "totalmark",
      ];
      for (i = 0; i < formIds.length; i++) {
        if (i == 3) {
          //otan diabazei tis hmeromhnies
          //to allazw se dd-mm-yyyy gia na mporesei na to xrhsimopoihsei h validate
          let date = data.eq(i).text().replace(/\//g, "-");
          date = date.substring(0, 10) + "," + date.substring(10, date.length);
          $("#" + formIds[i]).val(date);
        } else {
          $("#" + formIds[i]).val(data.eq(i).text());
        }
      }
      showForm();
    }
  });
}

function saveRel() {
  if ($("#mainId").val() != "" && $("#relIds").val() != "") {
    $("#form").submit();
  }
}

function removeSelectedId(idsRel, currentRowId) {
  let ids = idsRel.split("-");
  let i = 0;
  let found = false;
  let replace;
  while (i < ids.length && found == false) {
    if (ids[i] == currentRowId) {
      found = true;
    }
    i++;
  }
  i--;
  //eixe ena mono id
  if (ids.length == 1) {
    replace = "" + currentRowId;
  } else {
    //polla ids auto pou me endiaferei einai prwto
    if (i == 0) {
      replace = currentRowId + "-";
    } else {
      //polla ids auto pou me endiaferei einai endiamesa h sto telos
      replace = "-" + currentRowId;
    }
  }
  return idsRel.replace(replace, "");
}

function checkSubmit() {
  if ($("#relIds").val() != "") {
    $("#submit").prop("disabled", false);
  } else {
    $("#submit").prop("disabled", true);
  }
}

function tableClickableAsMainEntitie(id) {
  $("table[id='" + id + "'] tbody  tr").click(function () {
    if ($(this).hasClass("selected")) {
      $("#reset").click();
    } else {
      $("#reset").click();
      $(this).toggleClass("selected").siblings().removeClass("selected");
      //to id ths grammhs pou pathsa
      $("#mainId").val($(this).find("td").eq(0).text());
    }
    checkSubmit();
  });
}

function tableClickableAsSecondEntitie(id) {
  $("table[id='" + id + "'] tbody  tr").click(function () {
    //prepei prwta na exei epilexthei h kyria ontothta
    if ($("#mainId").val() != "") {
      if ($(this).hasClass("selected")) {
        //shmainei pws exw xanapathsei thn grammh opote prepei na afairesw to id
        let idsRel = $("#relIds").val();
        let currentRowId = $(this).find("td").eq(0).text();
        let newIdsRel = removeSelectedId(idsRel, currentRowId);
        $("#relIds").val(newIdsRel);
        $(this).toggleClass("selected");
      } else {
        $(this).toggleClass("selected");
        //to data periexei ta stoixeia ths grammhs pou pathsa
        let data = $(this).find("td");
        if ($("#relIds").val() == "") {
          $("#relIds").val(data.eq(0).text());
        } else {
          $("#relIds").val($("#relIds").val() + "-" + data.eq(0).text());
        }
      }
      checkSubmit();
    }
  });
}
