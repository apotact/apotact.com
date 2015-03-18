 //Using jQuery Event API v1.3
$('#mc-embedded-subscribe').on('click', function() {
  ga('send', 'event', 'mailchimp', 'subscribe', 'early sign up');
});
