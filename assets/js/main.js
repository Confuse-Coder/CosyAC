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

        var image = $(this).parents().parents().find('.productImg').attr('src');

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
          '<li class=" relPos compHeader"><p class="w3-display-middle">Features</p></li>' +
          '<li>Title</li>' +
          '<li>Size</li>' +
          '<li>Weight</li>' +
          '<li class="cpu">Processor</li>' +
          '<li>Battery</li></ul>' +
          '</div>'
      );

      // Lặp những sản phảm đã được add vào List[] vào Column II và III...
      for (var i = 0; i < list.length; i++) {
        // Hứng các giá trị cần có vào Column II & III
        var product = $('.selectProduct[data-id="' + list[i] + '"]'); // product hứng sản phẩm đã được selected
        var image = $('.selectProduct[data-id="' + list[i] + '"]')
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
            $(product).data('size') +
            '</li>' +
            '<li>' +
            $(product).data('weight') +
            '<li class="cpu">' +
            $(product).data('processor') +
            '</li>' +
            '<li>' +
            $(product).data('battery') +
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
