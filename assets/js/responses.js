function getBotResponse(input) {
  //Simple responses 1
  if (input === '<i id="chat-icon" style="color: crimson;" class="fa fa-fw fa-heart"></i>') {
    return 'I like you too <3';
  } else if (input == 'help me') {
    return 'Can I help you?';
  } else if (
    input == '15000 BTU' ||
    input == '20000 BTU' ||
    input == '25000 BTU' ||
    input == '30000 BTU' ||
    input == '15000 btu' ||
    input == '20000 btu' ||
    input == '25000 btu' ||
    input == '30000 btu' ||
    input == 'cheap AC' ||
    input == 'cheap Air Conditioner' ||
    input == 'expensive AC' ||
    input == 'expensive Air Conditioner' ||
    input == 'lowest AC' ||
    input == 'highest AC' ||
    input == 'lowest ac' ||
    input == 'highest ac' ||
    input == 'cheap ac' ||
    input == 'expensive ac' ||
    input == 'low ac' ||
    input == 'high ac' ||
    input == 'low AC' ||
    input == 'high AC'
  ) {
    return '<span>OK. Check it out. <a href="productsPage.html" style="text-decoration: underline">LET\'S GO SHOPPING!</a></span>';
  } else if (input == '15 btu') {
    return 'you mean 15000 BTU?';
  } else if (input == '25 btu') {
    return 'you mean 25000 BTU?';
  } else if (input == '10 btu') {
    return 'you mean 10000 BTU?';
  } else if (input == '20 btu') {
    return 'you mean 20000 BTU?';
  } else if (input == '30 btu') {
    return 'you mean 30000 BTU?';
  } else if (input == '15 BTU') {
    return 'you mean 15000 BTU?';
  } else if (input == '25 BTU') {
    return 'you mean 25000 BTU?';
  } else if (input == '10 BTU') {
    return 'you mean 150000 BTU?';
  } else if (input == '20 BTU') {
    return 'you mean 20000 BTU?';
  } else if (input == '30 BTU') {
    return 'you mean 30000 BTU?';
  } else if (input == 'yes' || input == 'y') {
    return '<span>OK. Check it out. <a href="productsPage.html" style="text-decoration: underline">LET\'S GO SHOPPING!</a></span>';
  }
  //Simple responses 2
  if (
    input == 'Hey Cosy' ||
    input == 'hey cosy' ||
    input == 'HEY COSY' ||
    input == 'hey' ||
    input == 'HEY' ||
    input == 'heyyyyy'
  ) {
    return 'I am here!';
  } else if (
    input == 'heyyyy' ||
    input == 'heyyy' ||
    input == 'heyyyyy' ||
    input == 'heyyyyyy' ||
    input == 'HEYYY' ||
    input == 'HEYYYY' ||
    input == 'HEYYYYY'
  ) {
    return 'Take it easy! I am here Champion!';
  } else if (input == 'paper') {
    return 'scissors';
  } else if (input == 'scissors') {
    return 'rock';
  }
  //Simple responses 3
  if (input == 'Hey you, I hot') {
    return 'Let Shopping with Cosy <3';
  } else if (input == 'Hey you, I cold') {
    return "Are you buy Cosy's Air Conditioner ?";
  }
  //rock paper scissors
  if (input == 'rock') {
    return 'paper';
  } else if (input == 'i miss you') {
    return 'i miss you too';
  } else if (input == 'I MISS YOU') {
    return 'I MISS YOU TOO';
  } else if (input == 'I LOVE YOU' || input == 'i love you') {
    return 'How much you love me? Here is my BankAccount: 17277687';
  } else if (input == 'hi') {
    return 'hi there';
  }

  // Simple responses 4
  if (input == 'hello') {
    return 'Hello there!';
  } else if (input == 'goodbye') {
    return 'Talk to you later!';
  } else {
    return 'Not available! COSY :(';
  }
}
