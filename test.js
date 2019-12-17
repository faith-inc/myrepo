jest.setTimeout(60000);
const object = require("../login-config.js");
const assert = require("chai").assert;
const should = require("should");
var post = [];

const expectedValues = require("../expect-placements-config.js");

const expectedValuesSearch = expectedValues["expectedValuesSearch"];

describe("cam tracking", () => {

  it("/search", async () => {
   var isOk = true;
   var placement = [];
   page.setRequestInterception(true);
   page.on('request', function (request){
    if (request.url().includes("t.insigit.com/4a54e80cce5f98dab17e9e4b935f6825/725d96c4807507eb4bc7635e22a0c096")&& request.method()=="POST") {
        //post = request.postData();
        post.push(JSON.parse(request.postData()));
       console.log("postData: ", JSON.parse(request.postData()) );
          }
    else {
       request.continue();
      } 
      
    });

    await page.goto(object["autologin"]);
    await page.waitFor(6000);
   
    console.log("POST array:", post);
    var filteredArr = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => ({placementId, actionId, promo, promocode, count}));

     console.log("filteredArr", filteredArr);
     console.log("obj to arr of keys: ",  Object.keys(expectedValuesSearch));
     console.log("filteredArr.length: ", filteredArr.length); 

     const convertArrtoObj = (array, key) =>{
      const initialValue = {};
      return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
          };
        }, initialValue);
      }
    console.log("convertArrtoObj", convertArrtoObj(filteredArr, "placementId"));

    assert.deepEqual(convertArrtoObj(filteredArr, "placementId"), expectedValuesSearch, "Test on  /search failed" );

       });

        
    });

   







 