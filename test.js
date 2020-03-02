jest.setTimeout(60000);
const {autologinLink} = require("../login-config.js");
const assert = require("chai").assert;
const should = require("should");
let post = [];
let url_transition = [];
const REQUEST_URL = "t.insigit.com/4a54e80cce5f98dab17e9e4b935f6825/725d96c4807507eb4bc7635e22a0c096";
const {expectedValuesSearch1} = require("../expect-placements-fixtures.js");
const {expectedValuesSearch2} = require("../expect-placements-fixtures.js");
const {selectorsOnSearch} = require("../placement-selectors.js");
let url_flag = false;



function convertArrtoObj(array, key1,  key2){
  const initialValue = {};
      return array.reduce((obj, item) => {
      return {
        ...obj,
         [`${item[key1]}_${item[key2]}`]: item,
          };
        }, initialValue);
} 


function subscribeToPost(){
     page.setRequestInterception(true);
   page.on('request', function (request){
    if (request.url().includes(REQUEST_URL)&& request.method()==="POST") {
        post.push(JSON.parse(request.postData()));
       console.log("postData: ", JSON.parse(request.postData()) );
       request.continue();
          }
    else {
       request.continue();
      } 
      
    });
}

  async function clickOnCamPlacement(selector, idOfCamPlacement){
    await page.waitFor(selector);
    await page.click(selector);
    await page.waitFor(3000); 
    console.log("idOfCamPlacement", idOfCamPlacement);
    if(idOfCamPlacement === "+27"){
      if (!page.url().includes("/search") ) await page.goBack(); 
      }
    }

  function getSumOfCount(filterarr, id, convertedArr){
    let countforid = 0;
    let filredCount_id= post.flat().filter(({placementId})=> placementId === id).map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({count}));
    for (let i = 0; i < filredCount_id.length; i++ ) {
        countforid = countforid + filredCount_id[i]["count"];
          }
    console.log("countforid", countforid);
    convertedArr[id+"_1"]["count"] = countforid;
    return convertedArr;
    }


describe("cam tracking", () => {

  it("/search", async () => { 
    subscribeToPost();
    

    await page.goto(autologinLink);
    await page.waitFor(6000);
   
    console.log("POST array:", post);
    let filteredPostArrSearch1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16);

    console.log("filteredPostArrSearch1", filteredPostArrSearch1);
    console.log("filteredPostArrSearch1 element2", filteredPostArrSearch1[2]);
    console.log("obj to arr of keys: ",  Object.keys(expectedValuesSearch1));
    console.log("convertArrtoObj", convertArrtoObj(filteredPostArrSearch1, "placementId", "actionId"));

    let convertedSearch1 = convertArrtoObj(filteredPostArrSearch1 , "placementId", "actionId");
    convertedSearch1 = getSumOfCount(filteredPostArrSearch1, 27, convertedSearch1);
    convertedSearch1 = getSumOfCount(filteredPostArrSearch1, 3, convertedSearch1);
    console.log("convertedSearch1", convertedSearch1);

    assert.deepEqual(convertedSearch1, expectedValuesSearch1, "Test on  /search impressions failed" );

       });

 it("clicks", async () => {
    let keyOfSelectors = Object.keys(selectorsOnSearch);
    console.log ("keyOfSelectors", keyOfSelectors[1]);
    console.log ("selectorsOnSearch", selectorsOnSearch[1]);


    for (let keyOfSelector of keyOfSelectors) {
      await clickOnCamPlacement(selectorsOnSearch[keyOfSelector], keyOfSelector);
      await page.bringToFront();
      console.log ("keyOfSelector", selectorsOnSearch[keyOfSelector]);
    }

    const pages = await browser.pages();

    for (let i = 2; i < pages.length; i++ ) {
          console.log("target - ", pages[i].url());
          url_transition.push(pages[i].url());
    }

    console.log("url_transition", url_transition);

    for (url of url_transition){
      if(url.includes("firecams")){
            url_flag = true;

      }
    }

     
   console.log("url_flag", url_flag);

    let filteredPostArrSearch2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
    ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !== 1);
    console.log("filteredPostArrSearch2", filteredPostArrSearch2);

     assert.deepEqual(convertArrtoObj(filteredPostArrSearch2, "placementId", "actionId"), expectedValuesSearch2, "Test on  /search clicks failed" );
     assert.equal(url_flag, true, "Transition on cam placements failed");

  })  

   
    });

   







 