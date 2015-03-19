app.factory("Menus", ["WPRest", "SITE_INFO", function(WPRest, SITE_INFO) {

  //our old friend from bootstrap_play
  function createHashMap(MenuLinksData) {
    var menuTree = [];
    var hash = {};

    MenuLinksData.sort(function(x, y) {
      return x.order > y.order;
    });


    MenuLinksData.forEach(function(link) {
      //with a small modification 
      //(removes http://{{site root}}/ from link urls)
      link.url = link.url.replace(SITE_INFO.http_root, "");

      // add an array called children to thisData
      link.children = [];
      // thisData contains a value of mlid that getting an underscore before the int. And because we are in a for each loop
      // it will add to every mlid's value in thisData. The underscore make mlid to a string. 
      // Now we make sure mlid is a key and by make it a string secure the key from "math" problems.
        hash["_"+link.ID] = link;

      // if i am top level, add to tree right away
      if(link.parent === 0){
        //remember: 
        menuTree.push(link);
        return;
      }
    });

    //then add children to all menu_links using the hash map
    //(so we don't have to loop through any number of sublevels)
    for(var i in hash){
      link = hash[i];
      //if no parent (no parent), skip this iteration of the loop
      if(link.parent === 0){continue;}

      //add me to menuTree using the hash map "shortcut" to each link
      hash["_"+link.parent].children.push(link);
    }

    // console.log("menuTree: ", menuTree);
    return menuTree;
  }

  //the callback function for GET requests with a menuId
  //that converts menu.items from a "flat" array into a tree
  function prepareMenu(menuObj) {
    menuObj.items = createHashMap(menuObj.items);

    return menuObj;
  }

  //our factory object
  var menuObject = {
    get : function(menuId) {
      var callUrl = menuId ? "/menus/" + menuId : "/menus";

      var broadcastInstructions = menuId ?
        //only use callback function if we are asking to a specific menu
        //using a menuId
        {
          broadcastName : "gotMenuLinks",
          callback: prepareMenu
        } :
        //else only provide the broadcast name
        "gotMenus";

      WPRest.restCall(callUrl, "GET", {}, broadcastInstructions);
    }
  };

  return menuObject;
}]);