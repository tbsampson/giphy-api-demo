// a list of random things like in no particular order
var myList = ["Javascript","Laser","Fruit","Cloud Computing","3301","Anonymous","Sushi","Pad Thai","Particle Physics","Motorcycle","Christopher Hitchens","Atheism","Democracy","Richard Dawkins","Neil deGrasse Tyson","Bill Murray","Arificial Intelligence","Lebanon","Mexico","Texas","Explosions","Family","World Peace"];
var giphyKey = "syAB7sQFIZqLPFCFXKRCZ3qd4FDn2Wy6"; // my api key
var gifCount = 9; // how gif many to show max per query
var tempGifArray = []; // temp storage for sorted list
var myListAZ = myList.sort(); //alphabatize the list
const listObj = '.btn.btn-small.shadow-sm.p-1.mr-1.ml-1.mt-1.mb-1.bg-white.rounded'; // list items button class
const buttonClear = '.btn.btn-small.shadow-sm.text-warning.p-1.mr-1.ml-1.mt-1.mb-1.bg-danger.rounded'; // clear button class
const gifImg = '.someClass'; // gif 

makeButtons(); //make buttons
function makeButtons() {
    $('.row.button-row').empty();
    for (let i = 0; i < myListAZ.length; i++){
        $('.row.button-row').append(`<div href="https://api.giphy.com/v1/gifs/search?q=${myListAZ[i]}&api_key=${giphyKey}&limit=${gifCount}" class="btn btn-small shadow-sm p-1 mr-1 ml-1 mt-1 mb-1 bg-white rounded">${myListAZ[i]}</div>`)
    }
    $('.row.button-row').append(`<div class="btn btn-small shadow-sm p-1 mr-1 ml-1 mt-1 mb-1 rounded">
                                        <input type="text" id="topicText" />
                                        <input type="button" id="topicSubmit" value="Add Topic"/>
                                </div>`) // add topic form
    $('.row.button-row').append(`<div class="btn btn-small shadow-sm text-warning p-1 mr-1 ml-1 mt-1 mb-1 bg-danger rounded">Clear Gifs</div>`) // add clear gifs button
    return false;
}

function clearGifs() { // remove gifs currently on page
    $('.row.gif-row').empty();
}

function displayGifs() { // click a button, get related gifs
    clearGifs(); //clear existing gifs
    event.preventDefault(); //make sure we don't go to a new url
    $.ajax({
        url: $(this).attr('href'),
        success: function(response) {
            tempGifArray = response.data;
            for (let i = 0; i < tempGifArray.length; i++) {
                let x = tempGifArray[i].images.fixed_height;
                if (x.width < 500) {
                    $('.row.gif-row').append(`<div class="btn btn-small shadow-sm bg-white mr-1 ml-1 mt-1 mb-1">
                        <img class="someClass" src="${tempGifArray[i].images.fixed_height_still.url}" height="${x.height}" width="${x.width}" data-go="${x.url}" 
                            data-stop="${tempGifArray[i].images.fixed_height_still.url}"</div>`)
                }        
            }
        }
    });
    return false;
}

function addTopic() { // add topic from user input
    let newTopic = $('#topicText').val();
    myListAZ.push(newTopic);
    makeButtons();
};

function startStop() { // swap gif with jpg
    console.log("Image was clicked")
    var src = ($(this).attr('src') === $(this).attr('data-go'))
        ? $(this).attr('data-stop')
        : $(this).attr('data-go');
    $(this).attr('src', src);
}

$(document).on("click", gifImg, startStop);
$(document).on("click", buttonClear, clearGifs);
$(document).on("click", '#topicSubmit', addTopic);
$(document).on("click", listObj, displayGifs);

