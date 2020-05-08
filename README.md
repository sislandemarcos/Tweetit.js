# Tweetit.js
A tiny jQuery plugin to tweet highlighted texts

### Demo

http://sislandemarcos.github.io/Tweetit.js/

### How to use it

* Copy the libraries to your project.
* Include the library in the header of your html file:
```html
<head>
  ...
  <link rel="stylesheet" href="css/tweetit.css">

...

  <script src="js/jquery.tweetit.js"></script>
  ...
</body>
```
* Decorate your DOM with some class that you can select for your plugin:
```html
<p class='tweet-it'>
  Some awesome text.
</p>
```
* Initiate your plugin:
```javascript
$('.tweet-it').tweetit();
```

### Optional parameters
- url : Your website address. If not provided, Tweetit.js will use the current page's url. If don't want to include a url in your tweet, pass a blank string.
- hashtags : comma separated list of Twitter hashtags. Do not include the # (hash) character
- via : the Twitter username to refer in the tweet. Do not include the @ (at) character

#### Example:
```javascript
$('.tweet-it').tweetit( {
   url : 'example.com', 
   via : 'username', 
   hashtags : 'jquery, plugin' } );
```

### Remarks
You may know that Twitter posts are restricted to 140 characters, including the url, via and hashtag paramters. Tweetit.js will include your parameters and restrict the actual text to comply with that restriction.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M2XMB9)

[MIT License](http://opensource.org/licenses/mit-license.php)
