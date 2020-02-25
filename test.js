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

async function clickOnCamPlacement(selector){
  await page.waitFor(selector);
   await page.click(selector);
    await page.waitFor(3000); // такая функция не срабатывает, ошибка Cannot read property 'url' of undefined
    const pages = await browser.pages();
    console.log("pages - ", pages[1].url);
      return pages;

}



describe("cam tracking", () => {

  it("/search", async () => { 
    subscribeToPost();
    
   // const page1 = await browser.newPage(); 

    await page.goto(autologinLink);
    await page.waitFor(6000);
   
    console.log("POST array:", post);
    let filteredPostArrSearch1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16);

    //let filteredPostArr = mappedPostArr.filter(({placementId})=> placementId !== 19 && placementId !==16);
     //console.log("mappedPostArr", mappedPostArr);
     console.log("filteredPostArrSearch1", filteredPostArrSearch1);
     console.log("obj to arr of keys: ",  Object.keys(expectedValuesSearch1));
     console.log("convertArrtoObj", convertArrtoObj(filteredPostArrSearch1, "placementId", "actionId"));

    assert.deepEqual(convertArrtoObj(filteredPostArrSearch1, "placementId", "actionId"), expectedValuesSearch1, "Test on  /search impressions failed" );

       });

  it("clicks", async () => {
   // selectorsOnSearch.forEach(element => clickOnCamPlacement(element)); 
   let keyOfSelectors = Object.keys(selectorsOnSearch);
   console.log ("keyOfSelectors", keyOfSelectors[1]);
   console.log ("selectorsOnSearch", selectorsOnSearch[1]);

//keyOfSelectors.forEach(element => clickOnCamPlacement(selectorsOnSearch[element]));
clickOnCamPlacement(selectorsOnSearch[1]);
clickOnCamPlacement(selectorsOnSearch[27]);
await page.bringToFront();
clickOnCamPlacement(selectorsOnSearch[3]);
clickOnCamPlacement(selectorsOnSearch[18]);

await page.waitFor(3000);


  //clickOnCamPlacement(selectorsOnSearch[1]);
/*
    await page.waitFor(selectorsOnSearch[3]);
    await page.click(selectorsOnSearch[3]);
    await page.waitFor(3000); */
   
//console.log("key",  Object.keys(selectorsOnSearch));
  
    
   // const pages = await browser.pages();
   // await page.bringToFront();
    //const url_1 = pages[2].url();


     // console.log("URL_1", url_1 );

/*

      await page.waitFor(selectorsOnSearch[3]);
      await page.click(selectorsOnSearch[3]);
      await page.waitFor(3000);
       //const url_3 = pages[2].url();
       //console.log("URL_3", url_3 );
      await page.bringToFront();

      await page.waitFor(selectorsOnSearch[27]);
      await page.click(selectorsOnSearch[27]);
      await page.waitFor(3000);
       //const url_27 = pages[1].url();
     // console.log("URL_27", url_27 );

      if (!page.url().includes("/search") ) await page.goBack();
      await page.waitFor(selectorsOnSearch[18]);
      await page.click(selectorsOnSearch[18]);
      await page.waitFor(3000);
      //const url_18 = pages[1].url();
     // console.log("URL_18", url_18 );
      console.log("Test", selectorsOnSearch[3]);

*/


    let filteredPostArrSearch2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
    ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !== 1);
    console.log("filteredPostArrSearch2", filteredPostArrSearch2);

     assert.deepEqual(convertArrtoObj(filteredPostArrSearch2, "placementId", "actionId"), expectedValuesSearch2, "Test on  /search clicks failed" );


  })

   
    });

   







 