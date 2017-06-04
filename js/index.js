var exampleChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var baseURL = 'https://wind-bow.gomix.me/twitch-api/';
var endURL = '?callback=?';
var windowWidth = $(window).width();

$(document).ready(function() {
  $.each(exampleChannels, function(index, value) {
    createChannelElement(value);
  });
});

/* Gets the JSON from the Twitch api and after creating a Object with the necessary
 info it appends it to the appropriate ul lists */
function createChannelElement(name) {
  $.getJSON(baseURL + 'streams/' + name + endURL, function(data) {

    if(data.stream !== null) {
      channel = data.stream.channel;
      // Get the useful information in a slimmer JS object
      var listJSO = {
        avatar: channel.logo,
        channel_name: channel.display_name,
        channel_desc: channel.status,
        channel_url: channel.url
      }

      $("#all-list").append(formListString(listJSO));
      $("#online-list").append(formListString(listJSO));
    }
    else {
      // Get the useful information in a slimmer JS object
      $.getJSON(baseURL + 'channels/' + name + '?callback=?', function(data) {
        var listJSO = {
          avatar: data.logo,
          channel_name: data.display_name,
          channel_desc: "Offline",
          channel_url: data.url
        }

        $("#all-list").append(formListString(listJSO));
        $("#offline-list").append(formListString(listJSO));
      });
    }
  });
}

// Forms the appropriate string to create a new List element
function formListString(channelInfo) {
  if(channelInfo.avatar === null) {
    channelInfo.avatar = "https://static-cdn.jtvnw.net/jtv-static/404_preview-1920x1080.png";
  }

  // checks if the window width is too narrow for all the characters to fit
  // if it is, it truncates the channel description to a maximum of 25 characters
  if(windowWidth < 768) {
    if(channelInfo.channel_desc.length > 20) {
      channelInfo.channel_desc = channelInfo.channel_desc.substring(0, 20) + '...';
    }
  }

  return "<li class='list-group-item clearfix'> \
  <img src='" + channelInfo.avatar + "' class='avatar img-rounded'/> \
  <div class='channel-info'> \
  <h4 class='channel-name'><a href=" + channelInfo.channel_url + ">" + channelInfo.channel_name +"</a></h4> \
  <p class='channel-desc'>"+ channelInfo.channel_desc +"</p> \
  </div> \
  </li>";
}