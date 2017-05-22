var example_channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var baseURL = 'https://wind-bow.gomix.me/twitch-api/'

$(document).ready(function() {
  $.each(example_channels, function(index, value) {
    getChannelInfo(value);
    console.log(value);
  });
});

function createListElement(listJSON) {
  $("#users-list").append(formListString(listJSON));
}

function formListString(jsonObject) {
  if(jsonObject.avatar === null) {
    jsonObject.avatar = "https://static-cdn.jtvnw.net/jtv-static/404_preview-1920x1080.png";
  }

  return "<li class='list-group-item clearfix'> \
    <img src='" + jsonObject.avatar + "' class='avatar img-rounded'/> \
    <div class='channel-info'> \
      <h3 class='channel-name'><a href=" + jsonObject.channel_url + ">" + jsonObject.channel_name +"</a></h3> \
    <p class='channel-desc'>"+ jsonObject.channel_desc +"</p> \
    </div> \
  </li>";
}

function getChannelInfo(name) {
  $.getJSON(baseURL + 'streams/' + name + '?callback=?', function(data) {

    if(data.stream !== null) {
      channel = data.stream.channel;
      // Get the useful information in a slimmer JSON object
      var listJSON = {
        avatar: channel.logo,
        channel_name: channel.display_name,
        channel_desc: channel.status,
        channel_url: channel.url
      }

      createListElement(listJSON);
    }
    else {
        $.getJSON(baseURL + 'channels/' + name + '?callback=?', function(data) {
          console.log(data.logo)
          var listJSON = {
            avatar: data.logo,
            channel_name: data.display_name,
            channel_desc: "Offline",
            channel_url: data.url
          }

          createListElement(listJSON);
        });
    }

  });
}
