tutorial_list = [
    ["Test 1","Output 1 what do you mean"],
    ["Test 2","Output 2"]
]

tutorial_index = 0

$(".panel").on('keypress', ".in", function(e) {
    if (e.which == 13) {
        $(this).prop('readonly', true);
        var input = $(this).val().split(" ");
        if (input[1]) {
            var output = execute(input[0], input[1]);
        } else {
            var output = execute(input[0], "");
        }
        $(".output").last().html(output)
        $(".panel").append($("<div class='action'>").html("<div class='action'><div class='command'><span class='symbol'>$</span><input class='in' type='text'></div><div class='output'></div></div>"));
        //$(".in").attr("placeholder",tutorial_list[0][1])
        $(".in").last().focus();
    }
});


function execute(command, parameters) {
    console.log(command, parameters);
    if (window[command]) {
        return window[command](parameters);
    } else {
        return "bash: " + command + " : command not found";
    }
}

files = {
    "root": {
        "aboutme.txt": "-Get new shell, -Buy Milk",
        "passwords.txt": "gmail: p@ssword, reddit: hunter2",
        "projects": {
            "bio.txt": "cells organisms",
            "chem.txt": "ions protons"
        }
    }
}


var upperFolder = null;
var currentFolder = files["root"];
var path = [];


function ls() {
    var keys = [];
    for (var key in currentFolder) {
        if (currentFolder.hasOwnProperty(key)) { //to be safe
            keys.push(key);
        }
    }
    return keys.join(" ");
}

function cat(filename) {
    if (filename == "") {
        return "usage: cat file ...";
    }
    if (typeof currentFolder[filename] == "object") {
        return "cat: " + filename + " : Is a directory"

    }
    if (currentFolder[filename] == "") {
        return "";
    }
    if (currentFolder[filename]) {
        return currentFolder[filename];
    } else {
        return "cat: " + filename + " : No such file or directory"
    }
}

function cd(folder) {
    if (folder == "") {
        return "";
    }
    if (folder == "..") {
        if (path.length > 0) {
            currentFolder = upperFolder;
            path.pop();
        }
    } else if (typeof currentFolder[folder] == "object") {
        upperFolder = currentFolder;
        currentFolder = currentFolder[folder];
        path.push(folder);
    } else {
        return "bash: cd: " + folder + ": No such file or directory";
    }
}

function mkdir(folderName) {
    if (folderName != "") {
        currentFolder[folderName] = {};
        return "";
    } else {
        return "usage: mkdir directory ...";
    }
}

function touch(fileName) {
    currentFolder[fileName] = "";
}

function echo(string) {
    return string;
}

function rm(name) {
    delete currentFolder[name]
}

function help() {
    return "Commands: ls, cd, mkdir, echo, touch, rm, cat, pwd, help";
}

function pwd() {
    if (path.length == 0) {
        return "/"
    }
    return "/" + path.join("/")
}


$('.panel').stop().animate({
    scrollTop: $(".panel")[0].scrollHeight
}, 800);