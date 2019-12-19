jest.setTimeout(60000);
const {autologinLink} = require("../login-config.js");
const assert = require("chai").assert;
const should = require("should");
let post = [];
const REQUEST_URL = "t.insigit.com/4a54e80cce5f98dab17e9e4b935f6825/725d96c4807507eb4bc7635e22a0c096";
const {expectedValuesSearch} = require("../expect-placements-fixtures.js");

function convertArrtoObj(array, key){
  const initialValue = {};
      return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
          };
        }, initialValue);
}


describe("cam tracking", () => {

  it("/search", async () => {
   page.setRequestInterception(true);
   page.on('request', function (request){
    if (request.url().includes(REQUEST_URL)&& request.method()=="POST") {
        post.push(JSON.parse(request.postData()));
       console.log("postData: ", JSON.parse(request.postData()) );
       request.continue();
          }
    else {
       request.continue();
      } 
      
    });

    await page.goto(autologinLink);
    await page.waitFor(6000);
   
    console.log("POST array:", post);
    let mappedPostArr = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => ({placementId, actionId, promo, promocode, count}));
    let filteredPostArr = mappedPostArr.filter(({placementId})=> placementId !== 19 && placementId !==16);
     console.log("mappedPostArr", mappedPostArr);
     console.log("filteredPostArr", filteredPostArr);
     console.log("obj to arr of keys: ",  Object.keys(expectedValuesSearch));
     console.log("convertArrtoObj", convertArrtoObj(filteredPostArr, "placementId"));

    assert.deepEqual(convertArrtoObj(filteredPostArr, "placementId"), expectedValuesSearch, "Test on  /search failed" );

       });

        
    });

   







 