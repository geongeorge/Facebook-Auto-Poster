# Facebook Groups Autoposter

## Intialize

1. Install [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en) chrome extension
2. Login to facebook using the required account
3. Open EditThisCookie and export cookies to clipboard by clicking <img src="https://i.imgur.com/qPRzb3k.png">
4. Paste it in `cookies.json`

## Configure

Edit post by editing `app.js`

```js
// Post
const linkToPost =
  "https://www.facebook.com/xyz/videos/test";

const post = `Watch this amazing video here: ${linkToPost}`;
// End Post

```

Add groups you've already joined in here: `groups.json`

## Run

Run this once to install dependancies
```
yarn
```

Run the script
```
node app.js
```

(You need chrome installed for vampire.js to work)