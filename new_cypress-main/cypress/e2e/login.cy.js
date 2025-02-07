describe('Проверка авторизации', function () {

    it('Проверка на позитивный кейс авторизации', function () {
         cy.visit('https://login.qa.studio/');  // Зашел на сайт
         cy.get('#mail').type('german@dolnikov.ru'); // Ввели правильный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
         cy.get('#loginButton').click(); // Нажали войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверил что после авт. есть нужный текст
         cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверил что есть крестик и он виден пользователю
      }) 

      it('Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');  // Зашел на сайт
        cy.get('#forgotEmailButton').click(); // Нажал "Забыли пароль" 
        cy.get('#mailForgot').type('german@dolnikov.ru') // Ввели правильный логин
        cy.get('#restoreEmailButton').click(); // Нажал Отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверил что текс соответствует
        cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
        cy.get('#exitMessageButton').should('be.visible'); // Проверил что есть крестик и он виден пользователю
     }) 

     it('Негативный кейс авторизации - неправильный пароль', function () {
        cy.visit('https://login.qa.studio/');  // Зашел на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели правильный логин
        cy.get('#pass').type('iLove'); // Ввели НЕправильный пароль
        cy.get('#loginButton').click(); // Нажали Войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверил что текс соответствует
        cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверил что есть крестик и он виден пользователю
     })

     it('Негативный кейс авторизации - неправильный лоин', function () {
        cy.visit('https://login.qa.studio/');  // Зашел на сайт
        cy.get('#mail').type('german@olnikov.ru'); // Ввели НЕправильный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверил что текс соответствует
        cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверил что есть крестик и он виден пользователю
     }) 

     it('Негативный кейс валидация', function () {
        cy.visit('https://login.qa.studio/');  // Зашел на сайт
        cy.get('#mail').type('germandolnikov.ru'); // Ввели НЕправильный логин, без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверил что текс соответствует
        cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
     }) 

     it('Приведение к строчным буквам в логине - ловим Баг', function () {
        cy.visit('https://login.qa.studio/');  // Зашел на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин с прописными буквами
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажали войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверил что текс соответствует
        cy.get('#messageHeader').should('be.visible'); // Проверил что текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверил что есть крестик и он виден пользователю
     }) 

 })
 
 describe('Покупка аватара', function () {                                   // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {      // название теста
         cy.visit('https://pokemonbattle.ru/');                             // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER_LOGIN');         // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD');                // вводим пароль
         cy.get('button[type="submit"]').click();                              // нажимаем кнопку Подтвердить
         cy.wait(4000);
         cy.get('.header__container > .header__id').click({ force: true });     // клик в шапке на аву тренера
         cy.get('[href="/shop"]').click();                                   // нажимаем кнопку Смена аватара
         cy.get('.available > button').first().click({ force: true });       // кликаем Купить у первого доступного аватара
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // вводим номер карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');    // вводим CVV карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');           // вводим срок действия карты
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Chepelev Dmitriy'); // вводим имя владельца
         cy.wait(4000);
         cy.get('.pay-btn').click();                                           // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                                  // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                           // нажимаем кнопку Отправить
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверяем наличие сообщения о успешной покупке
         cy.get('.payment__font-for-success').should('be.visible');          // проверяем видно ли сообщение пользователю
     });
 })
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 


