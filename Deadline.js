function addNotifcation() {
  totoalTodo = document.querySelectorAll(".todo");
  //Dersom notifiation_content har klassen active, fjerner den klassen og innholdet
  if ($("#notifcaton_content").hasClass("active")) {
    $("#notifcaton_content").removeClass("active");
    $("#notifcaton_content").html("");
    //Dersom den ikke har klassen active, vil den kjÃ¸re if-lÃ¸kken
  } else {
    if (totoalTodo) {
      isany = 0;
      //For hvert element i totalTodo vil den kjÃ¸te denne funksjonen med todo som parameter
      totoalTodo.forEach(function (todo) {
        todoText = $(todo).children(".todoItem")[0].innerText;
        //Logikk bak funksonen
        if (localStorage.getItem("dueDate_" + todoText) != null) {
          todoDueDate = JSON.parse(localStorage.getItem("dueDate_" + todoText));
          dueMonth = todoDueDate.slice(3, 5);
          dueMonth = parseInt(dueMonth);
          dueDay = todoDueDate.slice(0, 2);
          dueDay = parseInt(dueDay);
          dueYear = todoDueDate.slice(6, 10);
          dueYear = parseInt(dueYear);
          currentDate = new Date();
          currentDay = currentDate.getDate();
          currentMonth = currentDate.getMonth();
          currentYear = currentDate.getFullYear();
          currentMonth = currentMonth + 1;
          if (currentYear > dueYear) {
            isany = 1;

            $("#notifcaton_content").append(
              '<div class="notList">' + todoText + " har utlÃ¸pt</div>"
            );
          } else if (currentYear == dueYear && currentMonth > dueMonth) {
            isany = 1;

            $("#notifcaton_content").append(
              '<div class="notList">' + todoText + " har utlÃ¸pt/div>"
            );
          } else if (
            currentYear == dueYear &&
            currentMonth == dueMonth &&
            currentDay > dueDay
          ) {
            //Dersom den har utlÃ¸pt
            isany = 1;
            $("#notifcaton_content").append(
              '<div class="notList">' + todoText + " har utlÃ¸pt</div>"
            );
          } else if (
            currentYear == dueYear &&
            currentMonth == dueMonth &&
            currentDay == dueDay
          ) {
            //Dersom den snart utlÃ¸per
            isany = 1;
            $("#notifcaton_content").append(
              '<div class="notList">' + todoText + " utlÃ¸per snart</div>"
            );
          }
        }
      });
    }
    $("#notifcaton_content").addClass("active");
    //Dersom man ikke har noen pÃ¥minnelser
    if (!isany) {
      $("#notifcaton_content").append(
        '<div class="notList">Du har ingen pÃ¥minnelser</div>'
      );
    }
  }
}
