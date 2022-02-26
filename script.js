const taskList = [];
const badList = [];
const weekHrs = 7 * 24;
let taskListElm = document.getElementById("taskList");
let badListElm = document.getElementById("bad-list");
const handleOnSubmit = (e) => {
  const frmDt = new FormData(e);

  const task = frmDt.get("task");
  const hr = +frmDt.get("hr");

  if (hr < 1) {
    return alert("please enter valid hours");
  }
  const obj = {
    task,
    hr,
  };

  const ttlHr = taskTotalHrs();

  //   const ttlBadHr = badTotalHrs();
  if (ttlHr + hr > weekHrs) {
    return alert("you have exceeded the weekly hours");
  }
  taskList.push(obj);
  //   console.log(taskList);
  display();
  taskTotalHrs();
};

//display task list in the dom

const display = () => {
  let str = "";

  //loop through the task list and convert in to tr string
  taskList.map((item, i) => {
    str += `
        <tr>
                    <td><input type="checkbox" /></td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-warning" onClick="deleteTaskList(${i})">
                        <i class="fas fa-trash"></i>
                      </button>
                      <button class="btn btn-success" onClick="markAsNotToDo(${i})">
                        <i class="far fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>`;
  });

  taskListElm.innerHTML = str;
  taskTotalHrs();
};

const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `
        <tr>
                    <td><input type="checkbox" /></td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-success" onClick="markAsTask(${i})">
                        <i class="far fa-arrow-left"></i>
                      </button>
                      <button class="btn btn-warning" onClick="deleteBadList(${i})">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>`;
  });
  badListElm.innerHTML = str;
  taskTotalHrs();
  //   badTotalHrs();
};

//delete items from taskList

const deleteTaskList = (i) => {
  const itm = taskList.splice(i, 1);
  display();
  return itm[0];
};

//delete items from badList
const deleteBadList = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();
  taskTotalHrs();
  return itm[0];
};

//mark items as not to do
const markAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);
  displayBadList();
  taskTotalHrs();
};

//mark tasks to do
const markAsTask = (i) => {
  const badItm = deleteBadList(i);
  taskList.push(badItm);
  display();
};

// Display Total task Hours
const taskTotalHrs = () => {
  const total = taskList.reduce((a, c) => a + c.hr, 0);
  const ttlBadHr = badTotalHrs();

  const grandTotal = total + ttlBadHr;
  document.getElementById("total-hr").innerHTML = grandTotal;

  return grandTotal;
};

// Display Total bad Hours
const badTotalHrs = () => {
  const total = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("bad-hr").innerHTML = total;
  return total;
};
