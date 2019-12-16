jest.setTimeout(60000);
const object = require("../login-config.js");
const assert = require("chai").assert;
const should = require("should");
var post = [];
var expectPromo = "Firecams";

const expectedValuesSearch = {
  "placement1" :{
    placementId: 1,
    actionId: 1,
    promo: expectPromo,
    promocode:"hp",
    count: 1
  },
  "placement27":{
    placementId: 27,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 5
  },
   "placement3":{
    placementId: 3,
    actionId: 1,
    promo: expectPromo,
    promocode:"profile_search",
    count: 5
  },
   
  "placement18" :{
    placementId: 18,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 1
  },
  "placement19" :{
    placementId: 19,
    actionId: 1,
    promo: expectPromo,
    promocode:"activity_online_notif",
    count: 1
  },
  "placement16" :{
    placementId: 16,
    actionId: 1,
    promo: expectPromo,
    promocode:"notif",
    count: 1
  }
}



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
    // assert.equal(isOk, true);

    console.log("POST array:", post);
    console.log("expectedValuesSearch to array: ", typeof Array.from(expectedValuesSearch));

    

    var filteredArr = post.flat().map(({placementId, anchorId, actionId, promo, promocode, uid, count}) => ({placementId, actionId, promo, promocode, count}));

     console.log(filteredArr);
     console.log("obj to arr of keys: ",  Object.keys(expectedValuesSearch));

     var keysOfExpectSearch = Object.keys(expectedValuesSearch);
     var i = 0;
     filteredArr.forEach(placement =>{
      //  assert.deepEqual(JSON.stringify(placement), JSON.stringify(expectedValuesSearch[keysOfExpectSearch[i]]) ); //better to check includes
        console.log("placement: ",  JSON.stringify(placement));
        console.log("Exp: ",   JSON.stringify(expectedValuesSearch[keysOfExpectSearch[i]] ));
        //console.log("obj to sting: " ,  JSON.stringify(expectedValuesSearch).includes(JSON.stringify(placement)));
        assert(JSON.stringify(expectedValuesSearch).includes(JSON.stringify(placement)), "Test on  /search failed");
        i++;
                 
     })   

      });

     
     
      });

   







 