/** @format */

const Nightmare = require("nightmare");
const cookies = require("./cookies.json");
const groups = require("./groups.json");
const path = require('path');

let nightmare = Nightmare({
  show: true,
  typeInterval: 10,
  waitTimeout: 6000,
  loadTimeout: 6000,
  webPreferences: {
    images: true,
    preload: path.resolve(__dirname, './lib/preload.js')
  }
})

// Post
const linkToPost =
  "https://www.facebook.com/xyz/videos/test";

const post = `Watch this amazing video here: ${linkToPost}`;
// End Post

async function main() {

  await nightmare.goto("https://facebook.com/");

  console.log("Setting cookies");
  for (cookie of cookies) {
    await nightmare.cookies.set(cookie);
  }

  console.log("Waiting 1 second");
  await nightmare.wait(1000);

  console.log("Refreshing");
  await nightmare.goto("https://www.facebook.com/me");

  for (group of groups) {
    console.log(`Posting in ${group.name}`);
    await postInGroups(nightmare, group.id);

    console.log(`Waiting 2 seconds`);
    await nightmare.wait(2000);
  }
}

async function postInGroups(client, groupId) {
  const group = `https://www.facebook.com/groups/${groupId}`;

  console.log(group);

  await client.goto(group).wait(1000);

  console.log(`Opening create post modal`);

  let canCreatePost =  await client.evaluate(() => {
    const area = document
      .evaluate(`//span[contains(text(),"What's on your mind")]`, document, null, XPathResult.ANY_TYPE, null)
      .iterateNext()

    if(area) {
      area.click()

      return true
    } else {
      return false
    }
  })

  if(!canCreatePost) {
    console.log("Unable to create post in this group")
    return
  }

  await client.wait(1000)

  console.log(`Opening create post modal`);
  canCreatePost = await client.evaluate(() => {
    const area = document
      .evaluate(`//div[contains(@aria-label,'Write something...')]`, document, null, XPathResult.ANY_TYPE, null)
      .iterateNext()

    if(area) {
      area.classList.add("my-post-area");

      return true
    } else {
      return false
    }
  })

  if(!canCreatePost) {
    console.log("Unable to create post in this group")
    return
  }

  await client.wait(100)

  console.log(`Clicking on textarea and typing`);
  await client.type('.my-post-area', post);

  await client.wait(200)

  console.log(`Clicking on post button`);
  await client.evaluate(() => {
    const area = document
      .evaluate(`//div[@aria-label='Post'][contains(@role,'button')]`, document, null, XPathResult.ANY_TYPE, null)
      .iterateNext()

    area.click()
  })
}

main();
