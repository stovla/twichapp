var url = "https://wind-bow.gomix.me/twitch-api/streams/";
const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "noobs2ninjas", "Reyes7878", "CrafterLynx", "Electrokidi", "izanmagic", "brunofin", "comster404"];
var url1 = "https://wind-bow.gomix.me/twitch-api/streams/";
var url2 = "https://wind-bow.gomix.me/twitch-api/channels/" ;

(function (){
    var displayName;
    var html = "";
    // get response from primary api
    // and appending to the list
    channels.forEach(function(channel){
        $.ajax({
            url: url1 + channel,
            success: function (response) {
                if (response !== null){
                    if (response.stream !== null) {
                        displayName = response.stream.channel.display_name;
                        var game = response.stream.game;
                        var status = response.stream.channel.status;
                        $('.list').append('<div class="row online active"><img class="logo img-response img-rounded" src="'+ response.stream.channel.logo +'" alt=""><div class="pull-left"><a href="' + response.stream.channel.url + '" target="_blank"><h4 id="name">'+ displayName +'</h4></a><p id="desc">'+ game +'</p></div><div class="pull-right text-left"><p>"'+ status +'"</p></div></div>');
                    } else {
                        secondary(channel);
                    }
                } 
            }
        });
    });
})();
// get the response from a secondary api
// and appending to the list
function secondary (channel) {
    var message;
    $.ajax({
        url: url2 + channel,
        success: function(response) {
            if (response.status === 404) {
                 message = response.message;
            } else {
                  message = "Offline";
            }
            $('.list').append('<div class="row offline active"><img class="logo img-response img-rounded" src="'+ response.logo +'" alt="Not Available"><div class="float"><a href="' + response.url + '" target="_blank"><h4 id="name">'+ response.display_name +'</h4></a><p id="desc">"'+ message +'"</p></div></div>');
        }
    });
}

// buttons toggling the list
$('.btn-all').on("click", function () {
    $('.offline').show();
    $('.online').show();
});
$('.btn-online').on("click", function(){
    $('.offline').hide();
    $('.online').show();
});
$('.btn-offline').on("click", function(){
    $('.online').hide();
    $('.offline').show();
});

// function appendContent (data, displayName, game) {
//     $('.list').append('<div class="row online active"><img class="logo img-response img-rounded" src="'+ data.stream.channel.logo +'" alt=""><div class="float"><a href="' + data.stream.channel.url + '" target="_blank"><h2 id="name">'+ displayName +'</h2></a><p id="desc">'+ game +'</p></div></div>');
// }