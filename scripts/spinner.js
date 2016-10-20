var progressAmount = 300;
var selected;

/********** Begin spinner functionality adapted from http://jsfiddle.net/090yncuu/5/ ***********/
// random order
var _target, _deg = 0;
var _index = [0, 1, 2, 3, 4, 5, 6, 7],
    _repeatRandom = true;

function ordRandom() {
    return _deg = _deg + ((Math.floor(Math.random() * (8 - 1 + 1))) * 45) + 1080;
}

jQuery(document).ready(function ($) {
    $(document).on("click", "#spin", function(e) {
        // select algorithm sequential, random or preset :
        // if random order, don't repeat the same
        _repeatRandom = _index.length != 0;
        // loop until find one that has never been used
        while (_repeatRandom) {
            ordRandom();
            _target = (_deg - (360 * parseInt(_deg / 360))) / 45;
            var _inArray = $.inArray(_target, _index);
            if (_inArray > -1) {
                // target is in the array
                _repeatRandom = false; // break while loop
                // start animation
                // reset opacity of all segments to 1
                $(".slice").parent("li").velocity({
                    opacity: 1
                }, {
                    duration: 100,
                    complete: function () {
                        $(".wheel").velocity({
                            rotateZ: "-" + _deg + "deg"
                        }, {
                            // addtional settings and callback
                            duration: 3000,
                            complete: function (elements) {
                                // after spinning animation is completed, set opacity of target segment's parent
                                $(".slice").parent("li").eq(_target).velocity({
                                    opacity: 0.4
                                }, {
                                    duration: 100,
                                    // after opacity is completed, fire targeted segment in slice
                                    complete: function () {
                                        console.log("target: " + _target);
                                        switch (_target) {
                                            case 0:
                                                selected = 50;
                                                console.log("case 0");
                                                break;
                                            case 1:
                                                selected = 5;
                                                console.log("case 1");
                                                break;
                                            case 2:
                                                selected = 10;
                                                console.log("case 2");
                                                break;
                                            case 3:
                                                selected = 5;
                                                console.log("case 3");
                                                break;
                                            case 4:
                                                selected = 20;
                                                console.log("case 4");
                                                break;
                                            case 5:
                                                selected = 5;
                                                console.log("case 5");
                                                break;
                                            case 6:
                                                selected = 10;
                                                console.log("case 6");
                                                break;
                                            case 7:
                                                selected = 5;
                                                console.log("case 7");
                                        }
                                        progressAmount += selected;
                                        console.log("selected: " + selected);
                                        console.log("progressAmount: " + progressAmount);
                                        document.getElementById("progress").innerHTML = "$" + progressAmount + " of $10,000";
                                        thermometer(10000, progressAmount, true);
                                    } // third animation completed
                                }); // nested velocity 2
                            } // second animation completed
                        }); // nested velocity 1
                    } // first animation completed
                });

            }
        }
        return false;
    });

    // initialize slice
    $(".slice").slice({
        maxWidth: "85%"
    });
}); // ready
/********** End spinner functionality adapted from http://jsfiddle.net/090yncuu/5/ ***********/


/***** Format Currency Functionality from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript *****/
function formatCurrency(n, c, d, t) {
    "use strict";

    var s, i, j;

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    s = n < 0 ? "-" : "";
    i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\\d{3})(?=\\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/**
 * Thermometer Progress meter.
 * This function will update the progress element in the "thermometer"
 * to the updated percentage.
 * If no parameters are passed in it will read them from the DOM
 *
 * @param {Number} goalAmount The Goal amount, this represents the 100% mark
 * @param {Number} progressAmount The progress amount is the current amount
 * @param {Boolean} animate Whether to animate the height or not
 *
 * Thermometer functionality adapted from Jared Williams (Brightcove) https://jsfiddle.net/jaredwilli/22gLymp9/
 *
 */
function thermometer(goalAmount, progressAmount, animate) {
    "use strict";

    //set up our vars and cache some jQuery objects    
    var $thermo = $("#thermometer"),
        $progress = $(".progress", $thermo),
        $goal = $(".goal", $thermo),
        percentageAmount;

    //work out our numbers

    goalAmount = goalAmount || parseFloat($goal.text()),
        // progressAmount = progressAmount || parseFloat( $progress.text() ),
        percentageAmount = Math.min(Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

    //let's format the numbers and put them back in the DOM
    $goal.find(".amount").text("$" + formatCurrency(goalAmount));
    $progress.find(".amount").text("$" + formatCurrency(progressAmount));

    //let's set the progress indicator

    $progress.find(".amount").hide();

    if (animate !== false) {
        $(document.getElementsByClassName("initial")).removeClass("initial");
        $progress.animate({
            "height": percentageAmount + "%"
        }, 1200, function () {
            $(this).find(".amount").fadeIn(500);
        });
    }
    else { // we don't always want to animate
        $progress.css({
            "height": percentageAmount + "%"
        });
        $progress.find(".amount").fadeIn(500);
    }
}


/********** Countdown functionality adapted from Ali Mamedov http://stackoverflow.com/a/37260789 ***********/
var end = new Date('10/21/2016 3:00 PM');

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('countdown').innerHTML = days + ' days ';
    document.getElementById('countdown').innerHTML += hours + ' hrs ';
    document.getElementById('countdown').innerHTML += minutes + ' mins ';
    document.getElementById('countdown').innerHTML += seconds + ' secs';
}

timer = setInterval(showRemaining, 1000);