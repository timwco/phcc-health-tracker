var LocalStorageDB = function(successCallback, errorCallback) {

	// Used to simulate async calls. This is done to provide a consistent interface with storage methods like WebSQL and serverside ajax calls
    var callDelay = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            }, 100);
        }
    }

    // Allows us to sort an array of object - Use array.sort(sortByProperty('firstName'));
    var sortByProperty = function(property) {
        'use strict';
        return function (a, b) {
            var sortStatus = 0;
            if (a[property] < b[property]) {
                sortStatus = -1;
            } else if (a[property] > b[property]) {
                sortStatus = 1;
            }
     
            return sortStatus;
        };
    }
 
	// Sample Data (An array of objects)
    var todos = [
        {"id": 1, "title": "Take 15", "description": "Quiet Time", "status": 0},
        {"id": 2, "title": "Move 30", "description": "Exercise", "status": 0},
        {"id": 3, "title": "Sleep 7", "description": "Snooze ZZZ...", "status": 0},
        {"id": 4, "title": "Drink 64", "description": "Chug Chug (no soda)", "status": 0},
        {"id": 5, "title": "Seldom 3", "description": "No Fast Food / Cookies", "status": 0},
        {"id": 6, "title": "Eat 5", "description": "Fruits and Veggies", "status": 0}
    ];

    // Add the sample data to localStorage
    var localset = JSON.parse(window.localStorage.getItem("todos"));
    if (localset === null) {
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }

    this.findAll = function(callback) {
    	// Parse a string as json 
    	var todos = JSON.parse(window.localStorage.getItem("todos"));
        callDelay(callback, todos); 
    }

    this.findById = function(id, callback) {
        var todos = JSON.parse(window.localStorage.getItem("todos")),
        	todo = null,
        	len = todos.length,
            i = 0;
        
        for (; i < len; i++) {

            if (todos[i].id === id) {
                todo = todos[i];
                break;
            }
        }

        callDelay(callback, todo);
    }

    this.markCompleted = function(id, callback) {

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {
            if ( v.id === id ) {
                v.status = 1;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.markOutstanding = function(id, callback) {

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {
            if ( v.id === id ) {
                v.status = 0;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    this.update = function(json, callback) {

        // Converts a JavaScript Object Notation (JSON) string into an object.
        var passedJson = JSON.parse(json);

        // Get all todos
        var todos = JSON.parse(window.localStorage.getItem("todos")),
            todo = null,
            len = todos.length,
            i = 0;
        
        // Loop through them and update the value
        $.each(todos, function(i, v) {

            if ( v.id == passedJson.id ) {                
                v.description = passedJson.description;
                return false;
            }
        });

        // Save the JSON back to localStorage
        if (window.localStorage.setItem("todos", JSON.stringify(todos))) {
            callDelay(callback, "true");
        } else {
            callDelay(callback, "false");
        }
    }

    callDelay(successCallback);
}