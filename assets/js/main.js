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

        var displayTitle = $(this).parents('.selectProduct').attr('data-title');

        var image = $(this).siblings('.sib').children('.productImg').attr('src');

        $('.comparePan').append(
          '<div id="' +
            productID +
            '" class="relPos titleMargin w3-margin-bottom w3-col l3 m4 s4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="' +
            image +
            '" alt="image" style="height:100px;"/><p id="' +
            productID +
            '" class="titleMargin1">' +
            displayTitle +
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
        '<div class="w3-col s3 m3 l3 relPos">' +
          '<ul class="product">' +
          '<li class=" relPos compHeader"><p class="w3-display-middle">Products</p></li>' +
          '<li>Title</li>' +
          '<li>Dimension</li>' +
          '<li>Capacity</li>' +
          "<li>Manufacture's Brand</li>" +
          '<li>Warranty</li></ul>' +
          '</div>'
      );

      // Lặp những sản phảm đã được add vào List[] vào Column II và III...
      for (var i = 0; i < list.length; i++) {
        // Hứng các giá trị cần có vào Column II & III
        var product = $('.selectProduct[data-id="' + list[i] + '"]'); // product hứng sản phẩm đã được selected
        var image = $('.selectProduct[data-id="' + list[i] + '"]')
          .children('.sib')
          .children('.productImg')
          .attr('src');
        var title = $('.selectProduct[data-id="' + list[i] + '"]').attr('data-title');

        // Column II & III of Comparasion table
        $('.contentPop').append(
          '<div class="w3-col s3 m3 l3 relPos">' +
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
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th> </th>
                      <th>Total</th>
                    </tr>`;
  for (var i in cartArray) {
    output += `<tr>
                  <td>${cartArray[i].name}</td>
                  <td>${cartArray[i].price}</td>
                  <td><div class='input-group'><span class='minus-item input-group-addon btn btn-primary' data-name="${cartArray[i].name}">-</span>
                      <input type='number' class='item-count form-control' data-name="${cartArray[i].name}" value="${cartArray[i].count}">
                      <span class='plus-item input-group-addon btn btn-primary' data-name="${cartArray[i].name}">+</span></div></td> 
                  <td><button class='delete-item btn btn-danger' data-name="${cartArray[i].name}">X</button></td>
                  <td>${cartArray[i].total}</td>
                  </tr>`;
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html('$' + shoppingCart.totalCart());
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
