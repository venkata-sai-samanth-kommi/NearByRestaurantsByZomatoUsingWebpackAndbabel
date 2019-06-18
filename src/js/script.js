import "whatwg-fetch";
import "promise-polyfill/src/polyfill";
//use geolocation api to get latitude and longitude details of the user. 
//Pass them as parameters to the api call and get the desired output.
import {setLatitudeLongitudeAndCallUserAction} from './geolocation.js'
import '../css/jsapi.scss'
//import {toggleFunction} from './toggle.js'
var apikey = 'f37978903560541fbae981732c0e563f';


const createTag = (nameOfTag, tagAttributes, parentTag, content) =>
{
    var tag = document.createElement(nameOfTag);

    //setting attributes for the tag.

    if(tagAttributes!=null)
    for(let attribute in tagAttributes)
    {
        tag.setAttribute(attribute, tagAttributes[attribute]);
    }

    //setting content of the tag.

    if(content!=null)
    {
        var node = document.createTextNode(content);
        tag.appendChild(node);
    }

    //appending newly created tag to its parent.

    var parent = document.getElementById(parentTag);
    parent.appendChild(tag);
}

//script for bootstrap nav bar creation.
const createHeader = ()=>
{

createTag(`div`,{"id":`top-header`},`header`,null);
createTag(`nav`,{"class":`navbar navbar-inverse`,"id":`nav`},`top-header`,null);
createTag(`div`,{"class":`container`,"id":`container`},`nav`,null);
createTag(`div`,{"class":`navbar-header`,"id":`navbar-header`},`container`,null);
createTag(`div`,{"class":`navbar-brand`,"id":`navbar-brand`,"style":`color:white`},`navbar-header`,`Zomato Developer API`);
createTag(`ul`,{"class":`nav navbar-nav navbar-right`,"id":`navul`},`container`,null);
createTag(`li`,{"id":`homeli`},`navul`,null);
createTag(`a`,{"href":"#","id":"homea"},`homeli`,null);
createTag(`b`,{"style":`color:white`},`homea`,`HOME`);	
}
createHeader();

setLatitudeLongitudeAndCallUserAction();

export const userAction = async (latitude,longitude) => {

  let url = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&apikey=${apikey}`;
  const response = await fetch(url);
  const myJson = await response.json(); //extract JSON from the http response
  parseJsonAndCreateCards(myJson);
  console.log(myJson);
}

const parseJsonAndCreateCards = (myJson) =>{

  const parent = 'flex-container';
  //creation of cards.
  for(let index in myJson.restaurants)
  {//  console.log(myJson.restaurants[index].restaurant.name);
  createTag(`div`,{"id":`${index}`,"class":`normalcard`},`${parent}`,null);
  createTag(`img`,{"src":`${myJson.restaurants[index].restaurant.thumb}`,"onerror":`changeImage(${index})`,"class":"rimg","id":`${index}image`},`${index}`,null);
  createTag(`div`,{"class":"normalcontainer","id":`${index}container`},`${index}`,null);
  createTag(`h4`,{"id":`${myJson.restaurants[index].restaurant.name}`},`${index}container`,`${myJson.restaurants[index].restaurant.name}`);
  createTag(`div`,{"id":`${index}starRating`},`${index}container`,null);
  createTag(`p`,{"id":`${index}starPara`},`${index}starRating`,`Average user Rating : ${myJson.restaurants[index].restaurant.user_rating.aggregate_rating}`);
  createTag('span',{"class":`glyphicon glyphicon-star`},`${index}starPara`,`  `);
  //creating area for hiding and showing details.
  createTag(`div`,{"id":`${index}toggle`,"style":`display:none`,"class":"toggle"},`${index}`,null)
  createTag(`h5`,null,`${index}toggle`,`${myJson.restaurants[index].restaurant.location.address}`);
  createTag(`div`,{"class":"normalcontainer2","id":`${index}container2`},`${index}`,null);
  createTag(`button`,{"class":"btn btn-primary","id":`${index}button`},`${index}container2`,`Address`);
document.getElementById(`${index}button`).addEventListener('click',function(){ let x = document.getElementById(index+"toggle");

 if (x.style.display === "none") {
   x.style.display = "block";
 } else {
   x.style.display = "none";
 }})
//(index)=>{console.log(index);toggleFunction(index)})
// 

}
  createTag(`footer`,null,`body`,
  `Find Restaurants Near You!  \u00A9 Samanth`);
}

const changeImage = (_id)=>
{
  let x = document.getElementById(_id+"image");
  x.src = '/js/imna.png';
}
