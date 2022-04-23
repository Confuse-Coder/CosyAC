data = [
  {
    id: 'LG11',
    name: 'Window Air Conditioner',
    pic: 'LG/lg-1-1.webp',
    price: 800,
    src: '/productDetail-1.html',
    des: '15,000 BTU, Smart Wifi Enable Windown Air Conditioner',
  },
  {
    id: 'Reetech12',
    name: 'Air Conditioner MDS',
    pic: 'Samsung/ss-2-2.png',
    price: 850,
    src: '/productDetail-2.html',
    des: '22,000 BTU, WindFree™ Cooling AR9500T Air Conditioner',
  },
  {
    id: 'LG21',
    name: 'Air Conditioner 2100',
    pic: 'Samsung/ss-1-1.webp',
    price: 900,
    src: '/productDetail-3.html',
    des: '22,00BTU, AI Auto Cooling AR95000T  with Fast Cooling',
  },
  {
    id: 'Reetech13',
    name: 'LG PuriCare 360 Dual Filter Air Purifier',
    pic: 'LG/lg-2-1.webp',
    price: 950,
    src: '/productDetail-7.html',
    des: '18,000 BTU, LG PuriCare 360 Dual Filter Air Purifier',
  },
  {
    id: 'Samsung14',
    name: 'Air Conditioner with AI Auto Cooling',
    pic: 'Samsung/ss-2-3.png',
    price: 1000,
    src: '/productDetail-6.html',
    des: '15,000 BTU, ART9500T Air Conditioner AI Auto Cooling',
  },
  {
    id: 'Samsung11',
    name: 'Portable Air Conditioner',
    pic: 'Samsung/ss-2-1.webp',
    price: 1050,
    src: '/productDetail-8.html',
    des: '20,000 BTU, Maximum Cooling Portable Air Conditioner',
  },
  {
    id: 'LG31',
    name: 'Air Conditioner with Digital Inverter',
    pic: 'LG/lg-3-1.jpg',
    price: 1100,
    src: '/productDetail-4.html',
    des: '30,000 BTU, AR24TSEAFWK Air ft with Digital Inverter',
  },
  {
    id: 'Samsung21',
    name: 'AC with Digital Inverter 3k',
    pic: 'Samsung/ss-2-4.webp',
    price: 1150,
    src: '/productDetail-5.html',
    des: '25,000 BTU, AR24TSHZJWK Air Cor with Digital Inverter',
  },
];

$('#formSearch').keyup(function () {
  let search = $('#search').val();
  let re = new RegExp(search, 'ig');
  let subdata = data.filter((item) => item.name.search(re) >= 0);
  if (search.length > 0) {
    $('.list-group').css('display', 'block');
  } else {
    $('.list-group').css('display', 'none');
  }
  displayImages(subdata);
});

function displayImages(items) {
  let s = ``;

  $.each(items, function (k, v) {
    s += `<li class="p-2 bg-light product-list-item">
                <div class="row" data-id="${v.id}">
                <div class="col-md-6">
                    <a href="${v.src}"><img class="img-fluid" src="/img/${
      v.pic
    }" alt="" class=""></a>
                </div>
                <div class="col-md-6">
                    <h4 class="fw-bold" style="font-size:15px">${v.name.toUpperCase()} </h4>
                    <h5 style="color:gray; font-weight:600;font-size:15px;">${v.des}</h5>
                    <a href="${v.src}" class="d-block">
                      <span class="text-primary">SHOP NOW<i class="fa-solid fa-chevron-right text-primary"></i></span>
                    </a>
                </div>
                </div>
            </li>`;
  });

  $('#result').html(s);
}
