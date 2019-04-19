var updateID = null;
var emailInput = document.querySelector("#emailInput");
var passwordInput = document.querySelector("#passwordInput");
var loginButton = document.querySelector("#loginButton");
var registerButton = document.querySelector("#registerButton");
var thePage = document.querySelector("#thePage");
var loginDiv = document.querySelector("#loginDiv");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var login = document.querySelector("#login");
var register = document.querySelector("#register");

var createAssignment = function(assignmentName, classNameA, dueDate, professor, description) {
	var data = "assignmentName=" + encodeURIComponent(assignmentName);
	data += "&className=" + encodeURIComponent(classNameA);
	data += "&dueDate=" + encodeURIComponent(dueDate);
	data += "&professor=" + encodeURIComponent(professor);
	data += "&description=" + encodeURIComponent(description);
	
	fetch("https://weboneassignments.herokuapp.com/assignments", {
	method: 'Post', credentials: 'include', body: data, headers: {"Content-type": "application/x-www-form-urlencoded"}}).then(function(response) {
		console.log("Assignment saved.");
		getAssignments();
	});
};

var getAssignment = function(assignmentName, classNameA, dueDate, professor, description, id) {
	var data = "assignmentName=" + encodeURIComponent(assignmentName);
	data += "&className=" + encodeURIComponent(classNameA);
	data += "&dueDate=" + encodeURIComponent(dueDate);
	data += "&professor=" + encodeURIComponent(professor);
	data += "&description=" + encodeURIComponent(description);
	
	fetch(`https://weboneassignments.herokuapp.com/assignments/${id}`, {method: 'PUT', credentials: 'include', body: data, headers: {"Content-type": "application/x-www-form-urlencoded"}}).then(function(response) {
		console.log("Assignment updated.");
		getAssignments();
	});
};

var deleteAssignment = function(id) {
	fetch(`https://weboneassignments.herokuapp.com/assignments/${id}`, {method: 'DELETE', credentials: 'include'}).then(function(response) {
		console.log("Assignment deleted.");
		getAssignments();
	});
};

var addButton = document.querySelector("#the-button");
addButton.onclick = function() {
	var assignmentNameInput = document.querySelector("#assignmentNameInput");
	var classNameInput = document.querySelector("#classNameInput");
	var dueDateInput = document.querySelector("#dueDateInput");
	var professorInput = document.querySelector("#professorInput");
	var descriptionInput = document.querySelector("#descriptionInput");
	
	var assignmentName = assignmentNameInput.value;
	var classNameA = classNameInput.value;
	var dueDate = dueDateInput.value;
	var professor = professorInput.value;
	var description = descriptionInput.value;
	
	createAssignment(assignmentName, classNameA, dueDate, professor, description);
	assignmentNameInput.value = "";
	classNameInput.value = "";
	dueDateInput.value = "";
	professorInput.value = "";
	descriptionInput.value = "";
};

var submitButton = document.querySelector('#submitButton');
submitButton.onclick = function() {
	document.querySelector("#updateForm").style.display="none";
	document.querySelector("#formDiv").style.display="block";
	
	var assignmentNameInput = document.querySelector("#assignmentNameInputUpdate");
	var classNameInput = document.querySelector("#classNameInputUpdate");
	var dueDateInput = document.querySelector("#dueDateInputUpdate");
	var professorInput = document.querySelector("#professorInputUpdate");
	var descriptionInput = document.querySelector("#descriptionInputUpdate");
	
	var assignmentName = assignmentNameInput.value;
	var classNameA = classNameInput.value;
	var dueDate = dueDateInput.value;
	var professor = professorInput.value;
	var description = descriptionInput.value;
	
	getAssignment(assignmentName, classNameA, dueDate, professor, description, updateID);
	assignmentNameInput.value = "";
	classNameInput.value = "";
	dueDateInput.value = "";
	professorInput.value = "";
	descriptionInput.value = "";
}

var getAssignments = function() {
	fetch("https://weboneassignments.herokuapp.com/assignments", {credentials: 'include'}).then(function(response) {
		response.json().then(function(data) {
			
			var assignmentList = document.querySelector("#assignmentList");
			assignmentList.innerHTML = "";
			
			data.forEach(function(assignment) {
				var newItem = document.createElement("li");
				
				var assignmentNameDiv = document.createElement("div");
				if (assignment.assignmentName) {
					assignmentNameDiv.innerHTML = assignment.assignmentName;
				} else {
					assignmentNameDiv.innerHTML = "Assignment name missing.";
				}
				assignmentNameDiv.className = "assignment-name";
				newItem.appendChild(assignmentNameDiv);
				
				var dueDateDiv = document.createElement("div");
				if (assignment.dueDate) {
					dueDateDiv.innerHTML = assignment.dueDate;
				} else {
					dueDateDiv.innerHTML = "Due date missing.";
				}
				dueDateDiv.className = "due-date";
				newItem.appendChild(dueDateDiv);
				
				var classNameDiv = document.createElement("div");
				if (assignment.className) {
					classNameDiv.innerHTML = assignment.className;
				} else {
					classNameDiv.innerHTML = "Class name missing.";
				}
				classNameDiv.className = "class-name";
				newItem.appendChild(classNameDiv);
				
				var professorDiv = document.createElement("div");
				if (assignment.professor) {
					professorDiv.innerHTML = assignment.professor;
				} else {
					professorDiv.innerHTML = "Professor missing.";
				}
				professorDiv.className = "professor";
				newItem.appendChild(professorDiv);
				
				var descriptionDiv = document.createElement("div");
				if (assignment.description) {
					descriptionDiv.innerHTML = assignment.description;
				} else {
					descriptionDiv.innerHTML = "Description missing.";
				}
				descriptionDiv.className = "description";
				newItem.appendChild(descriptionDiv);
				
				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.onclick = function() {
					var proceed = confirm(`Do you want to delete ${assignment.assignmentName}?`);
					if (proceed) {
						deleteAssignment(assignment.id);
					}
				};
				newItem.appendChild(deleteButton);
				
				var updateButton = document.createElement("button");
				updateButton.innerHTML = "Update";
				updateButton.onclick = function() {
					document.querySelector("#updateForm").style.display="block";
					document.querySelector("#formDiv").style.display="none";
					
					var assignmentNameInput = document.querySelector("#assignmentNameInputUpdate");
					var classNameInput = document.querySelector("#classNameInputUpdate");
					var dueDateInput = document.querySelector("#dueDateInputUpdate");
					var professorInput = document.querySelector("#professorInputUpdate");
					var descriptionInput = document.querySelector("#descriptionInputUpdate");
					
					assignmentNameInput.value = assignment.assignmentName;
					classNameInput.value = assignment.className;
					dueDateInput.value = assignment.dueDate;
					professorInput.value = assignment.professor;
					descriptionInput.value = assignment.description;
	
					updateID = assignment.id;
					console.log(updateID);
				};
				newItem.appendChild(updateButton);
				
				assignmentList.appendChild(newItem);
			});
		});
	});
};

loginButton.onclick = function() {
    if (emailInput.value == '') {
        window.alert('Please input your email!');
    }
    else if (passwordInput.value == '') {
        window.alert('Please input your password!');
    } else {
        logUser(emailInput, passwordInput);
    }
}

registerButton.onclick = function() {
	if(emailInput.value == '') {
		window.alert('Please input your email!');
	}
	else if(passwordInput.value == '') {
		window.alert('Please input your password!');
	} else {
		var newUser = [emailInput, passwordInput];
		createUser(newUser);
	}
}

var createUser = function (newUser) {
    var auth = `&email=${encodeURIComponent(newUser[0].value)}`;
    auth += `&password=${encodeURIComponent(newUser[1].value)}`;
    fetch("https://weboneassignments.herokuapp.com/users", {method: 'POST', body: auth, credentials: 'include', headers: {"Content-type": "application/x-www-form-urlencoded"}}).then(function(response) {
        console.log('testing status: ', response.status);
        if (response.status == 422) {
            window.alert('Username or password incorrect.');
        }
        if (response.status == 401) {
            window.alert('Not logged in, please log in.');
        }
        if (response.status == 201) {
            console.log('if statement 201 ran', response);
            logging();       // auto login
		}
    });
}

var logUser = function (emailInput, passwordInput) {
	var userLog = `email=${encodeURIComponent(emailInput.value)}`;
	userLog += `&password=${encodeURIComponent(passwordInput.value)}`;
	fetch("https://weboneassignments.herokuapp.com/sessions", {method: 'POST', body: userLog, credentials: 'include', headers: { 'Content-type': 'application/x-www-form-urlencoded'}}).then(function(response) {
		console.log('testing status: ', response.status);
		if (response.status == 422) {
			window.alert('Username or password incorrect.');
		}
		if (response.status == 201) {
			console.log(response, '-log successful');
			logging();
			return response.json(); // do i need to do anything else???
		} else {
			// display unexpected error, try again
			window.alert('Username or password incorrect.');
		}
	});
}

var logging = function () {
	emailInput.style.display = 'none';
	passwordInput.style.display = 'none';
	loginButton.style.display = 'none';
	registerButton.style.display = 'none';
	thePage.style.display = 'block';
	email.style.display = 'none';
	password.style.display = 'none';
	login.style.display = 'none';
	register.style.display = 'none';
	loginDiv.style.display = 'none';
	getAssignments();
}

var loadPage = function() {
	fetch("https://weboneassignments.herokuapp.com/assignments",{ method: 'GET', credentials: 'include', headers: { 'Content-type': 'application/x-www-form-urlencoded'}}).then(function(response) {
		console.log(response.status);
		if (response.status == 200) {
			logging();
		} else {
			emailInput.style.display = 'inline-block';
			passwordInput.style.display = 'inline-block';
			loginButton.style.display = 'inline-block';
			registerButton.style.display = 'inline-block';
			email.style.display = 'inline-block';
			password.style.display = 'block';
			login.style.display = 'block';
			register.style.display = 'block';
			loginDiv.style.display = 'block';
		}
	});
}
loadPage();