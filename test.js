jest.setTimeout(60000);
const {autologinLink} = require("../login-config.js");
const {domain} = require("../login-config.js");



const assert = require("chai").assert;
const should = require("should");
let post = [];
let url_transition = [];
const REQUEST_URL = "t.insigit.com/4a54e80cce5f98dab17e9e4b935f6825/725d96c4807507eb4bc7635e22a0c096";

const {selectorsOnSearch} = require("../placement-selectors.js");
const {selectorsOnLivecam} = require("../placement-selectors.js");
const {selectorsOnUserId} = require("../placement-selectors.js");
const {selectorsOnRooms} = require("../placement-selectors.js");
const {selectorsOnLivechat} = require("../placement-selectors.js");
const {selectorsOnUserMenu} = require("../placement-selectors.js");


const {expectedValuesSearch1} = require("../expect-placements-fixtures.js");
const {expectedValuesSearch2} = require("../expect-placements-fixtures.js");
const {expectedValuesLivecam1} = require("../expect-placements-fixtures.js");
const {expectedValuesLivecam2} = require("../expect-placements-fixtures.js");
const {expectedValuesUserId1} = require("../expect-placements-fixtures.js");
const {expectedValuesUserId2} = require("../expect-placements-fixtures.js");
const {expectedValuesRooms1} = require("../expect-placements-fixtures.js");
const {expectedValuesRooms2} = require("../expect-placements-fixtures.js");
const {expectedValuesLivechat1} = require("../expect-placements-fixtures.js");
const {expectedValuesLivechat2} = require("../expect-placements-fixtures.js");
const {expectedValuesUserMenu1} = require("../expect-placements-fixtures.js");
const {expectedValuesUserMenu2} = require("../expect-placements-fixtures.js");



//let url_flag_search = false;
//const camDomain = "firecams";
//const camDomain = "ebonyflirtcams";
//const camDomain = "visit-x";
const camDomain = "camnaughtydate";





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
           page.waitFor(3000); 

       console.log("postData: ", JSON.parse(request.postData()) );
       request.continue();
          }
    else {
       request.continue();
      } 
      
    });
}

  async function clickOnCamPlacement(selector, idOfCamPlacement){

    if (idOfCamPlacement === "+18") {
      if (!page.url().endsWith("/search")) await page.goBack(); 
      }
    await page.waitFor(selector);
    await page.click(selector);
    await page.waitFor(3000); 
    console.log("idOfCamPlacement", idOfCamPlacement);
    
    //await page.bringToFront();

    }

  function getSumOfCount(filterarr, id, convertedArr){
    let countforid = 0;
   /* let filredCount_id= post.flat().filter(({placementId})=> placementId === id).map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({count})); */
    let filredCount_id = filterarr.filter(({placementId})=> placementId === id).map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({count}));

    for (let i = 0; i < filredCount_id.length; i++ ) {
        countforid = countforid + filredCount_id[i]["count"];
          }
    console.log("id", id);
    console.log("countforid", countforid);

    if (convertedArr[id+"_1"]["promocode"].includes("_offline")){
     //convertedArr[id+"_1"]["promocode"] = convertedArr[id+"_1"]["promocode"].substr(-8);
          convertedArr[id+"_1"]["promocode"] = convertedArr[id+"_1"]["promocode"].replace("_offline", ""); //надо найти метод

      console.log("replace offline", convertedArr[id+"_1"]["promocode"]);
    }

    convertedArr[id+"_1"]["count"] = countforid;
    return convertedArr;
    }

  function checkTransitionUrl(urlArr){
     let url_score = 0;
     let url_flag = false;
     for (url of urlArr){
       console.log("url", url);
       if(url.includes(camDomain)){
         url_score += 1;
        }
     }
     if (url_score == urlArr.length && urlArr.length > 0 ) {
      url_flag = true;
     }
    console.log("urlArr.length", urlArr.length);
    console.log("url_score", url_score);

    console.log("url_flag", url_flag);
    return url_flag;
  }  

  function clearArr(arr){
     while (arr.length) {
        arr.pop();
      }

  }


describe("cam tracking", () => {
    

  it("impressions on /search", async () => { 
    subscribeToPost();
    //await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
        await page.setGeolocation({latitude: 52.520008, longitude: 13.404954});



    await page.goto(autologinLink);
    //await page.setCookie("b66fde4a1bb308c20da92058390fd100", "172.98.77.97");
    // await page.goto(autologinLink);

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

 it("clicks on /search", async () => {
    let keyOfSelectors = Object.keys(selectorsOnSearch);
    console.log ("keyOfSelectors", keyOfSelectors[1]);
    console.log ("selectorsOnSearch", selectorsOnSearch[1]);
   
    for (let keyOfSelector of keyOfSelectors) {
      await clickOnCamPlacement(selectorsOnSearch[keyOfSelector], keyOfSelector);
      await page.bringToFront();
      console.log ("keyOfSelector", selectorsOnSearch[keyOfSelector]);
    }

    let pages = await browser.pages();

    for (let i = 2; i < pages.length; i++ ) {
          url_transition.push(pages[i].url());
    }

    console.log("url_transition", url_transition);

    let url_flag_search = checkTransitionUrl(url_transition);
    console.log("url_flag_search", url_flag_search);
    console.log("url_flag", url_flag_search);

    let filteredPostArrSearch2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
    ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !== 1);
    console.log("filteredPostArrSearch2", filteredPostArrSearch2);

     assert.deepEqual(convertArrtoObj(filteredPostArrSearch2, "placementId", "actionId"), expectedValuesSearch2, "Test on  /search clicks failed" );
     assert.equal(url_flag_search, true, "Transition on /search failed");

  });

  it("impressions on /tab:livecam", async () => {
        
      clearArr(post);

      await page.goto(domain + "/search/tab:livecam");
      console.log("page.url()", page.url());
      await page.waitFor(5000);
      console.log("post", post);

     let filteredPostArrlivecam1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16 && placementId !== 1);
     console.log("filteredPostArrlivecam1", filteredPostArrlivecam1);

     let convertedLivecam1 = convertArrtoObj(filteredPostArrlivecam1 , "placementId", "actionId");
     convertedLivecam1 = getSumOfCount(filteredPostArrlivecam1, 4, convertedLivecam1);
      console.log("convertedLivecam1", convertedLivecam1);

      assert.deepEqual(convertedLivecam1, expectedValuesLivecam1, "Test on  /livecam impressions failed" );


  });

  it("click on /tab:livecam", async () => {
         
    await clickOnCamPlacement(selectorsOnLivecam["+4"], "+4" );
    await page.bringToFront();
    let pages = await browser.pages();
    clearArr(url_transition);
 
    console.log("pages_length4", pages.length);
    console.log("pages 4", pages[4].url());
    url_transition.push(pages[4].url());
      
    let url_flag_livecam = checkTransitionUrl(url_transition);
    console.log("url_flag_livecam", url_flag_livecam);

    let filteredPostArrlivecam2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
    ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !== 1);
    console.log("filteredPostArrlivecam2", filteredPostArrlivecam2);

    assert.deepEqual(convertArrtoObj(filteredPostArrlivecam2, "placementId", "actionId"), expectedValuesLivecam2, "Test on  /ivecam clicks failed" );
    assert.equal(url_flag_livecam, true, "Transition on /livecam failed");

  });


  it("impressions on /ueserId", async () => {
    
    await page.goto(domain + "/search");
    await page.waitFor(5000);
    clearArr(post);

    await page.waitFor(3000);


    await clickOnCamPlacement(selectorsOnSearch["+27"], "+27" );
     console.log("post 27", post);
     let user_page = page.url();
     console.log("user_page", user_page);

    let filteredPostArrUserId1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16 && placementId !== 27);
     console.log("filteredPostArrUserId1", filteredPostArrUserId1);

     let convertedUserId1 = convertArrtoObj(filteredPostArrUserId1 , "placementId", "actionId");
     convertedUserId1 = getSumOfCount(filteredPostArrUserId1, 7, convertedUserId1);
     console.log("convertedUserId1", convertedUserId1);
     

      assert.deepEqual(convertedUserId1, expectedValuesUserId1, "Test on  /userId impressions failed" );


  });

  it("click on /userId", async () => {
    await page.bringToFront();
     clearArr(post);


     await clickOnCamPlacement(selectorsOnUserId["+7"], "+7" );
     console.log("post7", post);
     let pages = await browser.pages();

    while (url_transition.length) {
      url_transition.pop();
      }
      console.log("pages_length7", pages.length);
      url_transition.push(pages[5].url());
      console.log("url_transition 7", url_transition );

      let url_flag_userId = checkTransitionUrl(url_transition);
      console.log("url_flag_userId", url_flag_userId);

      let filteredPostArruserId2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16);
      console.log("filteredPostArruserId2", filteredPostArruserId2);

      assert.deepEqual(convertArrtoObj(filteredPostArruserId2, "placementId", "actionId"), expectedValuesUserId2, "Test on  /userId clicks failed" );
      assert.equal(url_flag_userId, true, "Transition on /userId failed");

  });

  it("impression on /rooms", async () => {
    await page.bringToFront();
      clearArr(post);

      await page.goto(domain + "/rooms");
      await page.waitFor(5000);
      console.log("post 23", post);

      let filteredPostArrRooms1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16 && placementId !== 1);
     console.log("filteredPostArrRooms1", filteredPostArrRooms1);

     let convertedRooms1 = convertArrtoObj(filteredPostArrRooms1 , "placementId", "actionId");
     assert.deepEqual(convertedRooms1, expectedValuesRooms1, "Test on  /rooms impressions failed" );

  });

  it("clicks on /rooms", async() => {
   
      clearArr(post);
      console.log("post23", post);

    await clickOnCamPlacement(selectorsOnRooms["+23"], "+23" );
     
     let filteredPostArrRooms2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && placementId !==15 );
      console.log("filteredPostArrRooms2", filteredPostArrRooms2);
      
      assert.deepEqual(convertArrtoObj(filteredPostArrRooms2, "placementId", "actionId"), expectedValuesRooms2, "Test on  /rooms clicks failed" );

  });


  it("impressions on /livechat", async() => {

    let filteredPostArrLivechat1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
      ({placementId, actionId, promo, promocode, count})).filter(({placementId})=> placementId !== 19 && placementId !==16 && placementId !== 23);
     console.log("filteredPostArrLivechat1", filteredPostArrLivechat1);

    let convertedLivechat1 = convertArrtoObj(filteredPostArrLivechat1 , "placementId", "actionId");
     convertedLivechat1 = getSumOfCount(filteredPostArrLivechat1, 15, convertedLivechat1);
     console.log("convertedLivechat1", convertedLivechat1);

     assert.deepEqual(convertedLivechat1, expectedValuesLivechat1, "Test on  /livechat impressions failed" );


  });

  it("clicks on /livechat", async() => {
      clearArr(post);
      console.log("post15_beforeckick", post);

      await clickOnCamPlacement(selectorsOnLivechat["+15"], "+15" );
      console.log("post15_afterckick", post);

      let pages = await browser.pages();
      clearArr(url_transition);
 
      console.log("pages_length15", pages.length);
      for(let i= 0; i< pages.length; i++) {
        console.log("loop for urls", pages[i].url())
      }
     console.log("current url", pages[6].url());
      url_transition.push(pages[6].url());

      let url_flag_livechat = checkTransitionUrl(url_transition);
    console.log("url_flag_livechat", url_flag_livechat);

    let filteredPostArrlivechat2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
    ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !==1 );
    console.log("filteredPostArrlivechat2", filteredPostArrlivechat2);

    assert.deepEqual(convertArrtoObj(filteredPostArrlivechat2, "placementId", "actionId"), expectedValuesLivechat2, "Test on  /ivechat clicks failed" );
    assert.equal(url_flag_livechat, true, "Transition on /ivechat failed");

  });

  it("impression on /userMenu", async() => {
        await page.bringToFront();

        clearArr(post);

        await clickOnCamPlacement(selectorsOnUserMenu["+2"], "+2" );
        console.log("post2", post);


        let filteredPostArruserMenu1 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
        ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 );
        console.log("filteredPostArruserMenu1", filteredPostArruserMenu1);

        assert.deepEqual(convertArrtoObj(filteredPostArruserMenu1, "placementId", "actionId"), expectedValuesUserMenu1, "Test on  /userMenu impressions failed" );

        
  });


  it("clicks on /userMenu", async() => {
        await clickOnCamPlacement(selectorsOnUserMenu["+2_2"], "+2_2" );

        let filteredPostArruserMenu2 = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => 
        ({placementId, actionId, promo, promocode, count})).filter(({placementId, actionId})=> placementId !== 19 && placementId !==16 && actionId !==1 );
        console.log("filteredPostArruserMenu2", filteredPostArruserMenu2);

        let pages = await browser.pages();
          clearArr(url_transition);

          console.log("pages_length2", pages.length);

      for(let i= 0; i< pages.length; i++) {
        console.log("loop for urls", pages[i].url())
      }

            url_transition.push(pages[7].url());

            let url_flag_userMenu = checkTransitionUrl(url_transition);
          console.log("url_flag_userMenu", url_flag_userMenu);

          assert.deepEqual(convertArrtoObj(filteredPostArruserMenu2, "placementId", "actionId"), expectedValuesUserMenu2, "Test on  /userMenu clicks failed" );
         assert.equal(url_flag_userMenu, true, "Transition on /userMenu failed");



  })


   
    });

   







 