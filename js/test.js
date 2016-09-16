/* File Name: test.js lastupdate: 2016/08/05
* Author: Callum McLeman
* Assignment: WE41 Mobile Web Applications, Digital Skills Academy
* Date : 2016/07/29
* 
* Refs: (DSA course units).. and. .
* getjson anatomy :http://www.pureexample.com/jquery/get-json.html
* Help with the listitem click event binding
* thanks to https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

*/
// public vars
// this file path  could come from another file pull/pick list, which loads available themes
// ie dinos, planets, lolcats, gardening tools etc..
var jsonFile = "data/json/assig-adapted3.json";
$(function(){
  //  primary file pull to get list items for the first screen
  
  //var jsonDataArea = "data/json/assignment3.json";
  // call-get json data using url/file path, and set up 'call back' function
  // which is -> 'function(data) {....  call back goes here ..} ' on
  //a successful retrieve
  /*"theme":"Dinosaur Hunter",
  "datatitle1":"name",
  "datatitle2":"era",
  "datatitle3":"existed",
  "datatitle4":"diet",
  "datatitle5":"mobility",*/
  var globalTheme = "";
  var globalTitle1 = "";
  var globalTitle2 = "";
  var globalTitle3 = "";
  var globalTitle4 = "";
  var globalTitle5 = "";


  $.getJSON( jsonFile, function (data) {
    //passes the 'data' object to the 'each' method as a parameter,
    // get screen title theme....
    globalTheme = data.structure.theme ;
    //  mark it up...
    $("#theme-loaded").text(globalTheme);
    //convert json tag literals first letter to uppercase
    // to use for info/data titles on second screen display
    // this.charAt(0).toUpperCase() + this.substr(1)
    //globalTitle1 = data.structure.datatitle1 ;
    globalTitle1 = data.structure.datatitle1.charAt(0).toUpperCase() + data.structure.datatitle1.substr(1);
    globalTitle2 = data.structure.datatitle2.charAt(0).toUpperCase() + data.structure.datatitle2.substr(1);
    globalTitle3 = data.structure.datatitle3.charAt(0).toUpperCase() + data.structure.datatitle3.substr(1);
    globalTitle4 = data.structure.datatitle4.charAt(0).toUpperCase() + data.structure.datatitle4.substr(1);
    globalTitle5 = data.structure.datatitle5.charAt(0).toUpperCase() + data.structure.datatitle5.substr(1);
    
      
    var liHTML = "";  
    ///data.content.themedata1.text 
    $.each( data.content, function(key,val){
      // wrap data in html list items - builds one big string of html
      liHTML += '<li><a href="#data-pic'+key+'">' + val.themedata1 + '</a></li>';
      // build a div for this data and append into page 2 id="jasonData"
      // first part/line of html id is for a href later...
      var newPage = '<div data-role="page" id="data-pic'+ key+'">'; 
      var lineOne = '<div class="info-holder"><h1>'+ val.themedata1 + '</h1>';
      var lineTwo = '<img class="img-responsive" src="' + val.image +'" alt="Missing picture!"></div>';
      
     
      var tableBlock = '<table class="table">' ;
      tableBlock +=  '<tr><td>'+ globalTitle2+'</td><td>' + val.themedata2 + '</td></tr>';
      tableBlock +=  '<tr><td>'+ globalTitle3+'</td><td>' + val.themedata3 + '</td></tr>';
      tableBlock +=  '<tr><td>'+ globalTitle4+'</td><td>' + val.themedata4 + '</td></tr>';
      tableBlock +=  '<tr><td>'+ globalTitle5+'</td><td>' + val.themedata5 + '</td></tr><tr><td></td><td></td></tr></table>';



      
      var infoText = '<div id="well-data-text"><p>'+ val.themeinfotext+ '</p></div></div>';
      var fullDiv = newPage+lineOne+lineTwo+tableBlock+infoText;

      $("#main-wrapper").append(fullDiv).promise().done();
      //$('#data-pic'+ key).trigger('pagecreate');
    });
    //end for/each
    // need to bind on the fly the click events for each item given that we 
     // have no href to play with as such...
     // first attatch the html, used promise and done to ensure all append
     // is complete ( won't work with out it!)
    $("#jsonList").append(liHTML).promise().done(function () {
    //$("#jsonList").append(liHTML).done(function () {
        //refresh list here 
        $(this).listview("refresh");
        //then add click event using delegation 'li' list item tag/element - is a unique set/group
        $(this).on("click", "a", function () {
            
          //alert($(this).attr("href"));
          $.mobile.changePage( $(this).attr("href"), "slidedown", true, true);

        });
    });
    // append, promise, done and bind
  });   
  // get json
});
//  anonymous func end

