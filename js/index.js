// A list of the inputs and outputs of all commands you want in the tutorial
// Possible to do: Add a 'command output' and then a 'tutorial output' section
// TO make it a little more clearer what part of the output is a command
// and what part of the output is the tutorial telling you your next steps
tutorial_list = [
    ["ipconfig.exe | grep -A 4 -B 8 IPv4","Windows IP Configuration                  <br>\
                                                                                     <br>\
                                                                                     <br>\
    Ethernet adapter vEthernet (Default Switch):                                     <br>\
                                                                                     <br>\
       Connection-specific DNS Suffix  . :                                           <br>\
       Link-local IPv6 Address . . . . . : 1234::1234:1234:1234:6c9a%21              <br>\
       <b>IPv4</b> Address. . . . . . . . . . . : 123.45.67.89                      <br>\
       Subnet Mask . . . . . . . . . . . : 255.255.255.255                           <br>\
       Default Gateway . . . . . . . . . :                                           <br>\
                                                                                     <br>\
    Ethernet adapter Ethernet:                                                       <br>\
                                                                                     <br>\
       Connection-specific DNS Suffix  . : corp.microsoft.com                        <br>\
       IPv6 Address. . . . . . . . . . . : 1234:1234:d8:405:e487:8113:1234:b13       <br>\
       Temporary IPv6 Address. . . . . . : 1234:4898:d8:405:5555:cc0:f8d1:2601       <br>\
       Link-local IPv6 Address . . . . . : 1234::5222:8113:3b43:b13%16               <br>\
       <b>IPv4</b> Address. . . . . . . . . . . : XX.XXX.XXX.XXX                     <br>\
       Subnet Mask . . . . . . . . . . . : 255.255.254.0                             <br>\
       Default Gateway . . . . . . . . . : 1234::1234:1234:fe3c:c200%16              <br>\
                                           XX.XXX.XXX.X                              <br>\
    <br>\
    Now we can easily put that IP Address into a file. Use:                          <br>\
    echo \"123.45.67.89\" >> ipaddress.txt"],
    ["echo \"123.45.67.89\" >> ipaddress.txt","<br>\
    And then lastly we can take the contents of that file and put it into our clipboard using: <br>\
    cat ipaddress.txt >> clip.exe"],
    ["cat ipaddress.txt >> clip.exe","<br>\
    And it's that easy! (Please note that in this case it won't actually be copied to your clipboard \
    as this is a mock bash instance)"],
    ["Done!","You finished the tutorial!"]
]

tutorial_index = 0

// Initialize our placeholder
$(".in").attr("placeholder",tutorial_list[tutorial_index][0])

// The function that's called when you press enter
$(".panel").on('keypress', ".in", function(e) {
    if (e.which == 13) {
        $(this).prop('readonly', true);
        var input = $(this).val();
        var output = stepTutorial(input);
        $(".output").last().html(output)
        $(".window-padding").append($("<div class='action'>").html("<div class='action'><div class='command'><span class='symbol'>$</span><input class='in' type='text'></div><div class='output'></div></div>"));
        $(".in").attr("placeholder",tutorial_list[tutorial_index][0])
        $(".in").last().focus();
    }
});

// Step through the tutorial
function stepTutorial(input_line) {
    console.log(input_line)
    if (input_line.replace(/ /g,'') == tutorial_list[tutorial_index][0].replace(/ /g,'')) {
        var return_string = tutorial_list[tutorial_index][1];
        if (tutorial_index < tutorial_list.length - 1) {
            tutorial_index++;
        }
        return return_string
    }
    return "Please follow the tutorial by inputting: " + tutorial_list[tutorial_index][0];
}

// Animate the scrolling screen
$('.panel').stop().animate({
    scrollTop: $(".panel")[0].scrollHeight
}, 800);