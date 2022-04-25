// <reference path="jquery-1.12.3.js" />

(function ($) {
  var list = [];

  /* function to be executed when product is selected for comparision*/
  $(document).on('click', '.addToCompare', function () {
    // INVOKE FUNCTIONS
    $('.comparePanle').show();
    $(this).parents('.selectProduct').toggleClass('selected');
    var productID = $(this).parents('.selectProduct').attr('data-id');

    var inArray = $.inArray(productID, list);

    if (inArray == -1) {
      // inArray = -1 => Giá trị khởi tạo, trong Array chưa có phần tử nào
      if (list.length > 2) {
        $('#WarningModal').show();
        $('#warningModalClose').click(function () {
          $('#WarningModal').hide();
        });
        $(this).parents('.selectProduct').toggleClass('selected');
        return;
      }

      if (list.length < 3) {
        list.push(productID);

        var image = $(this).siblings('.sib').children('.productImg').attr('src');
        var displayDes = $(this).parents('.selectProduct').attr('data-des');
        var displayPrice = $(this).parents('.selectProduct').attr('data-price');
        var srcPro = $(this).siblings('.sib').attr('href');

        $('.comparePan').append(
          '<div id="' +
            productID +
            '" class="relPos w3-col l4 m4 s4"><div class="w3-white"><a class="selectedItemCloseBtn w3-closebtn cursor"><i class="fa-regular fa-trash-can"></i></a><a href="' +
            srcPro +
            '"><img src="' +
            image +
            '" alt="image" style="height:100px;"/></a><p class="comparePan-text-1" id="' +
            productID +
            '">' +
            displayDes +
            '</p><p class="comparePan-text-2" id="' +
            productID +
            '"class="fw-bold" >' +
            displayPrice +
            '</p></div></div>'
        );
      }
    } else {
      // inArray() tìm thấy phần tử trong list[]
      list.splice($.inArray(productID, list), 1); //Remove phần tử cuổi cùng trong mảng list[]
      $('#' + productID).remove();
      hideComparePanel();
    }

    if (list.length > 1) {
      // Trong mảng từ 2 sản phẩm => show "Compare" button
      $('.cmprBtn').addClass('active');
      $('.cmprBtn').removeAttr('disabled');
    } else {
      $('.cmprBtn').removeClass('active');
      $('.cmprBtn').attr('disabled', '');
    }
  });

  // Trigger .cmprBtn => "Compared" Button press
  $(document).on('click', '.cmprBtn', function () {
    if ($('.cmprBtn').hasClass('active')) {
      // Column I of Comparasion table
      $('.contentPop').append(
        '<header class="text-white m-5">' +
          '<h1 class="pt-3">THE #HERO' +
          '</h1>' +
          '<h2 class="pt-1">COMMING SOON' +
          '<h2>' +
          '<h1 class="countdown">00 : 00 : 00 : 00' +
          '</h1>' +
          '</header>' +
          '<div class="container ">' +
          '<a href="/productsPage.html">' +
          '<button type="button" class="btn btn-light">' +
          '<i class="fa-solid fa-chevron-left">' +
          '</i>' +
          '</button>' +
          '</a>' +
          '<span class="p-4 fw-bolder">Back' +
          '</span' +
          '<div class="row">' +
          '<div class="display-3 text-center">' +
          '<h1 class="display-3--tittle-1 fw-bold">Compare' +
          '</h1>' +
          '<div class="heading-line">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="w3-col s3 m3 l3 pb-5 mb-5">' +
          '<ul class="product">' +
          '<li class=" compHeader"></li>' +
          '<li class="compHeader-2">Product</li>' +
          '<li>Dimension</li>' +
          '<li>Capacity</li>' +
          '<li>Manufacture</li>' +
          '<li>Warranty</li>' +
          '<li>Price</li>' +
          '<li class="hero-event text-secondary fw-bolder" style="padding:17px 0px;">#HERO Event<i class="fa-solid fa-gift p-1"></i></li>' +
          '</ul>' +
          '</div>'
      );

      // Lặp những sản phảm đã được add vào List[] vào Column II và III...
      for (var i = 0; i < list.length; i++) {
        // Hứng các giá trị cần có vào Column II & III
        var src = $('.selectProduct[data-id="' + list[i] + '"]')
          .children('.sib')
          .attr('href');
        var product = $('.selectProduct[data-id="' + list[i] + '"]'); // product hứng sản phẩm đã được selected
        var image = $('.selectProduct[data-id="' + list[i] + '"]')
          .children('.sib')
          .children('.productImg')
          .attr('src');
        var title = $('.selectProduct[data-id="' + list[i] + '"]').attr('data-title');

        // Column II & III of Comparasion table
        $('.contentPop').append(
          '<div class="w3-col s3 m3 l3 relPos1 pb-5 mb-5">' +
            '<ul class="product">' +
            '<li class="compHeader"><img src="' +
            image +
            '" class="compareThumb"></li>' +
            '<li>' +
            title +
            '</li>' +
            '<li>' +
            $(product).data('dimension') +
            '</li>' +
            '<li>' +
            $(product).data('capacity') +
            '<li>' +
            $(product).data('manufacture') +
            '</li>' +
            '<li>' +
            $(product).data('warranty') +
            '</li>' +
            '<li class="fw-bold">' +
            $(product).data('price') +
            '</li>' +
            '<li>' +
            '<a href="' +
            src +
            '">' +
            '<button class="btn rounded-pill-1 fw-bold ">' +
            'Shop Now' +
            '</button>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</div>'
        );
      }
    }

    $('.modPos').show(); // .modPos Comparision pop-up
  });

  /* function to close the comparision popup */
  $(document).on('click', '.closeBtn', function () {
    // RESET SAU KHI CLICK CLOSE BUTTON
    $('.contentPop').empty(); // Xoá Pop-up Comparision
    $('.comparePan').empty(); // Xoá Pop-up Preview Content Selected Comparision
    $('.comparePanle').hide(); // Ẩn Pop-up Preview (wrapper)
    $('.modPos').hide(); // Ẩn Pop-up Comparision Table
    $('.selectProduct').removeClass('selected'); // Bỏ class đã CSS thể hiện "active"
    list.length = 0;
  });

  /*function to remove item from preview panel*/
  $(document).on('click', '.selectedItemCloseBtn', function () {
    // Nút X dùng xoá sản phẩm muốn so sánh
    var test = $(this).siblings('p').attr('id'); //Hứng thẻ có ID cần xoá
    $('[data-id=' + test + ']') // Từ attr tìm class của siblings thẻ chứa nó
      .find('.addToCompare')
      .click();
    hideComparePanel();
  });

  function hideComparePanel() {
    if (!list.length) {
      //Falsy value => Nếu trong list[] empty thì run...
      $('.comparePan').empty();
      $('.comparePanle').hide();
    }
  }
})(jQuery);

//Add to Cart
var shoppingCart = (function () {
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart với Session Storage
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart từ Session Storage
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem('shoppingCart') != null) {
    // Ain't no given
    loadCart();
  }

  var obj = {};
  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    //Bước 1: Nếu cart trùng thì ++
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count++;
        saveCart();
        return;
      }
    }
    //Bước 2: Nếu cart không trùng thì thêm mới vào cart[]
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  // Set count from item
  obj.setCountForItem = function (name) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count++;
        break;
      }
    }
  };

  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count--;
        if (cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var i in cart) {
      totalCount += cart[i].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var i in cart) {
      totalCart += cart[i].price * cart[i].count;
    }
    return Number(totalCart);
  };

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = [];
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
})();

// Add item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = `<tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>`;
  var output2 = `<tr>
  <th>Product</th>
  <th>Price</th>
  <th>Quantity</th>
</tr>`;

  for (var i = 0; i < cartArray.length; i++) {
    output += `<tr>
                  <td>${cartArray[i].name}</td>
                  <td>${'$' + cartArray[i].price}</td>
                  <td><div class='input-group'><span class='minus-item input-group-addon btn btn-primary' data-name="${
                    cartArray[i].name
                  }">-</span>
                      <input type='number' class='item-count form-control' data-name="${
                        cartArray[i].name
                      }" value="${cartArray[i].count}">
                      <span class='plus-item input-group-addon btn btn-primary' data-name="${
                        cartArray[i].name
                      }">+</span></div></td> 
                  <td>${'$' + cartArray[i].total}</td>
                  </tr>`;
    output2 += `
    <tr>
    <td>${cartArray[i].name}</td>
    <td>${'$' + cartArray[i].price}</td> 
    <td>${cartArray[i].count}</td>
    </tr>
    `;
  }
  $('.show-cart-2').html(output2);
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html('$' + shoppingCart.totalCart());
  $('.total-count1').html(shoppingCart.totalCount());
}

// Delete-item
$('.show-cart').on('click', '.delete-item', function () {
  var name = $(this).data('name');
  alert('delete ' + name);
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// Minus-item
$('.show-cart').on('click', '.minus-item', function () {
  var name = $(this).data('name');
  shoppingCart.removeItemFromCart(name);
  displayCart();
});
// Plus-item
$('.show-cart').on('click', '.plus-item', function () {
  var name = $(this).data('name');
  shoppingCart.addItemToCart(name);
  displayCart();
});

// Item-icount <input>
$('.show-cart').on('change', '.item-count', function () {
  var name = $(this).data('name');
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

//COUNTDOWN EVENT
let launchDate = new Date('April 30, 2022 12:00:00').getTime();

let timer = setInterval(tick, 1000);

function tick() {
  let now = new Date().getTime();
  let t = launchDate - now;

  if (t > 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    if (days < 10) {
      days = '0' + days;
    }

    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) {
      hours = '0' + hours;
    }

    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    if (mins < 10) {
      mins = '0' + mins;
    }

    let secs = Math.floor((t % (1000 * 60)) / 1000);
    if (secs < 10) {
      secs = '0' + secs;
    }

    let time = `${days} : ${hours} : ${mins} : ${secs}`;

    document.querySelector('.countdown').innerText = time;
  }
}
