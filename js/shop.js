import { shopData } from "./shopData.js";

/* 상품 list 자동 생성 */
// let productData = shopData;

// const slingBag_data = productData.slingBag;
// const pouch_data = productData.pouch;
// const keyRing_data = productData.keyRing;
// const bracelet_data = productData.bracelet;
// const toteBag_data = productData.toteBag;

// const slingBag_list = $("#slingBag ul.product_list");
// const pouch_list = $("#pouch ul.product_list");
// const keyRing_list = $("#keyRing ul.product_list");
// const bracelet_list = $("#bracelet ul.product_list");
// const toteBag_list = $("#toteBag ul.product_list");

// function createProduct(set_Name, set_Price) {
//   const product_list = document.querySelector("ul.product_list");

//   let listElems = document.createElement("li");
//   let figureElems = document.createElement("figure");
//   let imgElems = document.createElement("img");
//   let figcationElems = document.createElement("figcaption");
//   let pElems_name = document.createElement("p");
//   let pElems_price = document.createElement("p");

//   imgElems.setAttribute("src", "./images/shop/shop_sticky1.png");
//   pElems_name.className = "product_name";
//   pElems_name.innerText = set_Name;

//   pElems_price.className = "product_price";
//   pElems_price.innerText = set_Price;

//   figcationElems.appendChild(pElems_name);
//   figcationElems.appendChild(pElems_price);
//   figureElems.appendChild(imgElems);
//   figureElems.appendChild(figcationElems);

//   listElems.appendChild(figureElems);
//   product_list.appendChild(listElems);
// }

// shopData.slingBag.forEach((slingBag_list) => {
//   let product_Name = slingBag_list.product_Name;
//   let product_Price = slingBag_list.product_Price;
//   createProduct(product_Name, product_Price);
// });
// shopData.pouch.forEach((slingBag_list) => {
//   let product_Name = slingBag_list.product_Name;
//   let product_Price = slingBag_list.product_Price;
//   createProduct(product_Name, product_Price);
// });
// shopData.keyRing.forEach((slingBag_list) => {
//   let product_Name = slingBag_list.product_Name;
//   let product_Price = slingBag_list.product_Price;
//   createProduct(product_Name, product_Price);
// });
// shopData.bracelet.forEach((slingBag_list) => {
//   let product_Name = slingBag_list.product_Name;
//   let product_Price = slingBag_list.product_Price;
//   createProduct(product_Name, product_Price);
// });
// shopData.toteBag.forEach((slingBag_list) => {
//   let product_Name = slingBag_list.product_Name;
//   let product_Price = slingBag_list.product_Price;
//   createProduct(product_Name, product_Price);
// });

$(document).ready(function () {
  /* section 높이 지정 */
  const sectionElems = document.querySelectorAll("section");

  sectionElems.forEach((sectionElem) => {
    let product_wrap = sectionElem.querySelector(".product_wrap");
    let productHeight = product_wrap.clientHeight;
    sectionElem.style.height = `${productHeight + 100}px`;
  });
});
