/**
 * maabdurrahman-portfolio-scripts
 * @author Mahdi Abdurrhaman
 * @version 1.0.0
 * @date 9 February 2024
 */
/*===================================================
          navigation and scroll-spy
=====================================================*/
$(function () {

   /*===============================================================
          preloader
   ==================================================================*/
   // makes sure that whole site is loaded
   $('#preloader__gif, #preloader').fadeOut(2500, function () {

   });

   /*===============================================================
          navigation and footer navigation
   ==================================================================*/
   const short_options = {
      rootMargin: '0px', threshold: 0.7,
   }
   const long_options = {
      rootMargin: '0px', threshold: 0.5,
   }

   const short_observer = new IntersectionObserver(addNavigationLinksActiveClass, short_options);
   const long_observer = new IntersectionObserver(addNavigationLinksLongActiveClass, long_options);

   const short_sections = document.querySelectorAll('.js-scroll-spy');
   const long_sections = document.querySelectorAll('.js-scroll-spy--long');

   const navigation_links = document.querySelectorAll('.navigation__link');
   const footer_navigation_links = document.querySelectorAll('.footer__navigation-link');

   short_sections.forEach(short_section => {
      short_observer.observe(short_section);
   });
   long_sections.forEach(long_section => {
      long_observer.observe(long_section);
   });

   /**
    * @description - removes active class from navigation links
    */
   function removeNavigationLinksActiveClass() {
      navigation_links.forEach(navigation_link => {
         navigation_link.classList.remove('active');
      })
   }

   /**
    * @description - removes active class from footer navigation links
    */
   function removeFooterNavigationLinksActiveClass() {
      footer_navigation_links.forEach(footer_navigation_link => {
         footer_navigation_link.classList.remove('active');
      })
   }

   /**
    * @description - removes the active class from the navigation links and adds the active
    * class to the current navigation link whose 'href=#id' is in the viewport
    * @param entries - the sections that are in the array to observed
    * @param short_observer - the Intersection Observer
    */
   function addNavigationLinksActiveClass(entries, short_observer) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            let current_link = document.querySelector(`#navigation__list a[href='#${entry.target.id}']`);
            let current_footer_link = document.querySelector(`#footer__navigation-list a[href='#${entry.target.id}']`);

            removeNavigationLinksActiveClass();
            removeFooterNavigationLinksActiveClass();

            current_link.classList.add('active');
            current_footer_link.classList.add('active');
         }
      });
   }

   /**
    * @description - removes the active class from the navigation links and adds the active
    * class to the current navigation link whose 'href=#id' is in the viewport
    * @param entries - the sections that are in the array to observed
    * @param long_observer - the IntersectionObserver
    */
   function addNavigationLinksLongActiveClass(entries, long_observer) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            let current_link = document.querySelector(`#navigation__list a[href='#${entry.target.id}']`);
            let current_footer_link = document.querySelector(`#footer__navigation-list a[href='#${entry.target.id}']`);

            removeNavigationLinksActiveClass();
            removeFooterNavigationLinksActiveClass();

            current_link.classList.add('active');
            current_footer_link.classList.add('active');
         }
      });
   }

   /**
    * @description - toogle the active class for the navigation_button, navigation_button-bars,
    * navigation_background, and navigation_list
    */
   function toggleNavigation() {
      $('.navigation__button').toggleClass('active');
      $('.navigation__background').toggleClass('active');
      $('.navigation__list').toggleClass('active');
      $('body').toggleClass('no-scroll');
   }

   /**
    * @description - removes the active class on the navigation_button, navigation_background,
    * navigation_list and removes the no-scroll class on the body. Thus, closing the navigation
    * when the navigation_list or navigation_item is clicked.
    */
   function closeNavigation() {
      $('.navigation__button').removeClass('active');
      $('.navigation__background').removeClass('active');
      $('.navigation__list').removeClass('active');
      $('body').removeClass('no-scroll');
   }

   $('#navigation__button').on('click tap', function () {
      toggleNavigation();
   });

   $('#navigation__list, .navigation__item').on('click tap', function () {
      closeNavigation();
   });

});

/*===============================================================
          skills progress bars
==================================================================*/
$(function () {
   $('#progress-bars').waypoint(function () {
      $('.progress-bar').each(function () {
         $(this).animate({
            width: $(this).attr('aria-valuenow') + '%',
         }, 1500);
      });

      this.destroy();
   }, {
      offset: '100%',
   });
});

/*===============================================================
          portfolio section
==================================================================*/
$(function () {

   /****** add and remove active class from portfolio filter buttons ******/
   /*$('#portfolio__filters > .js-filter').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
   });*/
   const filter_link_items = document.querySelectorAll('.js-filter');

   /**
    * @description - removes the active class from the filter link items
    */
   function removeFilterLinkItemsActiveClass() {
      filter_link_items.forEach(filter_link_item => {
         filter_link_item.classList.remove('active');
      })
   }

   /**
    * @description - add the active class to the filter link item that was clicked
    * @param e - the event of the click
    */
   function addFilterLinkItemsActiveClass(e) {
      removeFilterLinkItemsActiveClass();
      e.target.classList.add('active');
   }

   filter_link_items.forEach(filter_link_item => {
      filter_link_item.addEventListener('click', addFilterLinkItemsActiveClass);
   });

   /**************** portfolio filterizr cards ****************/
   const filterizr_options = {
      animationDuration: 0.5, // in seconds
      callbacks: {
         onFilteringStart: function () {
         }, onFilteringEnd: function () {
         }, onShufflingStart: function () {
         }, onShufflingEnd: function () {
         }, onSortingStart: function () {
         }, onSortingEnd: function () {
         }
      }, controlsSelector: '', // Selector for custom controls
      delay: 0, // Transition delay in ms
      delayMode: 'progressive', // 'progressive' or 'alternate'
      easing: 'ease-out', filter: 'all', // Initial filter
      filterOutCss: { // Filtering out animation
         opacity: 0, transform: 'scale(0.5)'
      }, filterInCss: { // Filtering in animation
         opacity: 0, transform: 'scale(1)'
      }, gridItemsSelector: '.filtr-container', gutterPixels: 0, // Items spacing in pixels
      layout: 'sameSize', // See layouts
      multifilterLogicalOperator: 'or', searchTerm: '', setupControls: true, // Should be false if controlsSelector is set
      spinner: { // Configuration for built-in spinner
         enabled: false, fillColor: '#2184D0', styles: {
            height: '75px', margin: '0 auto', width: '75px', 'z-index': 2,
         },
      },
   }

   const filterizd = $('.filtr-container').filterizr({});

});

/*===============================================================
          contact section
==================================================================*/
$(function () {
   $('#contact__section--title-paragraph').waypoint(function () {
      var typed5 = new Typed('#contact__section--paragraph', {
         strings: ['If you', 'If you have any', 'If you have any questions or wish', 'If you have any questions or wish to collaborate,', 'If you have any questions or wish to collaborate, send me a message! ',],
         typeSpeed: 120,
         backSpeed: 70,
         backDelay: 1000, // cursorChar: '_',
         showCursor: false,
         shuffle: false,
         smartBackspace: true,
         loop: false,
      });

      this.destroy();
   }, {
      offset: 'bottom-in-view',

   });

   //**************** effect 07 scripts ****************//
   $('.utils-effect-07').val('');

   $('.js-effect-07 .utils-effect-07').focusout(function () {
      if ($(this).val() !== '') {
         $(this).addClass('has-content');
      } else {
         $(this).removeClass('has-content');
      }
   });

   //**************** form validation scripts ****************//
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|I|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;
   const required_message_length = 30;
   const maximum_message_length = 160;

   const semantic_success = '#166534';
   const semantic_alert = '#991B1B';
   const semantic_warn = '#C68A04';

   let is_name_valid = false;
   let is_email_valid = false;
   let is_message_valid = false;

   const name_input = $('#input-01');
   const email_input = $('#input-02');
   const message_input = $('#contact__form--message');
   const notification_message = $('#notification__message');
   const submit_button = $('#contact__form--submit');
   const notification_title = $('#notification__message--title');
   const notification_text = $('#notification__message--text');

   let timeoutID1;
   let timeoutID2;
   let timeoutID3;
   let timeoutID4;
   let timeoutID5;
   let timeoutID6;
   let timeoutID7;
   let timeoutID8;
   let timeoutID9;

   /**
    * @description - makes the parameter a String
    * @param object - the parameter
    * @returns {string} - returns a String
    */
   function makeString(object) {
      if (object == null) return '';
      return '' + object;
   }

   /**
    * @description - remove HTML tags from a String
    * @param str - a String
    * @returns {string} - returns a String with the tags removed
    */
   function removeHTMLTags(str) {
      return makeString(str).replace(/<\/?[^>]+>/g, '');
   }

   /**
    * @description - produces the message at the element id in the specific semantic color
    * @param message - the message in form of a String
    * @param prompt_location - the element id where the message is displayed
    * @param color - the semantic color alert or success
    */
   function getPrompt(message, prompt_location, color) {
      document.getElementById(prompt_location).innerHTML = message;
      document.getElementById(prompt_location).style.color = color;
   }

   /**
    * @description - checks whether input for name is valid or not, and adds an
    * interactive message
    * @returns {boolean} - if input is valid, returns true; otherwise, return false
    */
   function checkNameInput() {
      let name = $('#input-01').val();
      let message = '';

      if (name.length === 0) {
         message = 'Your first and last name are required!';
         is_name_valid = false;
         getPrompt(message, 'contact__form--name-prompt', semantic_alert);

         return false;
      }
      if (!name.match(name_pattern)) {
         message = 'Enter first and last name!';
         is_name_valid = false;
         getPrompt(message, 'contact__form--name-prompt', semantic_alert);

         return false;
      }

      message = 'Welcome ' + name;
      is_name_valid = true;
      getPrompt(message, 'contact__form--name-prompt', semantic_success);

      return true;
   }

   /**
    * @description - checks whether input for email is valid or not, and adds an
    * interacive validation message
    * @returns {boolean} - if input is valid, returns true; otherwise, return false
    */
   function checkEmailInput() {
      let email = $('#input-02').val();
      let message = '';

      if (email.length === 0) {
         message = 'Your email address is required!';
         is_email_valid = false;
         getPrompt(message, 'contact__form--email-prompt', semantic_alert);

         return false;
      }
      if (!email.match(email_pattern)) {
         message = 'Invalid email address!';
         is_email_valid = false;
         getPrompt(message, 'contact__form--email-prompt', semantic_alert);

         return false;
      }

      message = 'Valid email address';
      is_email_valid = true;
      getPrompt(message, 'contact__form--email-prompt', semantic_success);

      return true;
   }

   /**
    * @description - checks whether the textarea for the message is valid or not, and
    * adds an interactive validation message
    * @returns {boolean} - if input is valid, returns true; otherwise, return false
    */
   function checkMessageInput() {
      let form_message = $('#contact__form--message').val();
      form_message = removeHTMLTags(form_message);

      let characters_left = required_message_length - form_message.length;
      let characters_number = maximum_message_length - form_message.length;
      let message = '';


      if (form_message.length < required_message_length) {
         message = characters_left + ' more characters required in message!';
         is_message_valid = false;
         getPrompt(message, 'contact__form--message-prompt', semantic_alert);

         return false;
      } else {
         message = 'Valid message';
         is_message_valid = true;
         getPrompt(message, 'contact__form--message-prompt', semantic_success);

         return true;
      }
   }

   /**
    * @description -
    */
   function performInvalidForm() {
      if (timeoutID1) {
         clearTimeout(timeoutID1);
         clearTimeout(timeoutID2);
      }
      notification_message.css('display', 'block');
      notification_title.innerHTML = 'Error';
      notification_message.addClass('move-in-from-right notification__error');
      updateErrors();

      timeoutID1 = setTimeout(() => {
         notification_message.addClass('exit-to-left');
         notification_message.removeClass('move-in-from-right');
         timeoutID2 = setTimeout(() => {
            notification_message.removeClass('exit-to-left');
            notification_message.css('display', 'none');
         }, 1500);
      }, 3500);
   }

   /**
    * @description -
    */
   function performValidForm() {
      if (timeoutID3) {
         clearTimeout(timeoutID3);
         clearTimeout(timeoutID4);
         clearTimeout(timeoutID5);
         clearTimeout(timeoutID6);
         clearTimeout(timeoutID7);
      }
      timeoutID3 = setTimeout(function () {
         submit_button.val('Valid Form');
      }, 1500);

      submit_button.addClass('valid');

      timeoutID4 = setTimeout(function () {
         submit_button.val('Sending Message...');
      }, 1500);

      submit_button.prop('disable', true);

      if (submit_button.hasClass('valid')) {
         timeoutID5 = setTimeout(function () {
            submit_button.val('Message Sent');

            /* show notification message with success */
            notification_message.css('display', 'block');
            notification_message.addClass('move-in-from-right notification__success');
            notification_message.html(`<h4>Success!</h4>
                 <p>Your message was successfully sent.</p>
                 `);
            notification_message.children('h4').addClass('notification__message--title');
            notification_message.children('span').addClass('notification__message--text');
            timeoutID6 = setTimeout(() => {
               notification_message.addClass('exit-to-left');
               notification_message.removeClass('move-in-from-right');
               timeoutID7 = setTimeout(() => {
                  notification_message.removeClass('exit-to-left');
                  notification_message.css('display', 'none')
               }, 5500);
            }, 8000);
         }, 5000);
      }
      resetForm();
   }

   /**
    * @description -
    */
   function resetForm() {
      if (timeoutID8) {
         clearTimeout(timeoutID1);
         clearTimeout(timeoutID2);
         clearTimeout(timeoutID3);
         clearTimeout(timeoutID4);
         clearTimeout(timeoutID5);
         clearTimeout(timeoutID6);
         clearTimeout(timeoutID7);
         clearTimeout(timeoutID8);
         clearTimeout(timeoutID9);
      }
      timeoutID8 = setTimeout(() => {
         location.reload();

         timeoutID9 = setTimeout(() => {
            name_input.empty();
            email_input.empty();
            message_input.empty();
            submit_button.val('Send Message');
            submit_button.prop('disable', false);
            is_name_valid = false;
            is_email_valid = false;
            is_message_valid = false;
         }, 2000);
      }, 13500);
   }

   /**
    * @description -
    */
   function updateErrors() {
      let message = '';
      notification_message.html(`<h4 class='notitication__message--title'>Error!</h4>
          <p class='notification__message--text'>The following are error(s) in the form:</p>`);
      notification_message.children('h4').addClass('notification__message--title');
      notification_message.children('p').addClass('notification__message--text');

      if (!is_name_valid) {
         if ($('#input-01').val().length === 0) {
            notification_message.append(`<p>Your first and last name are required!</p>`);
            notification_message.children('p').addClass('notification__message--text');
            message = 'First and last name are required!';
            getPrompt(message, 'contact__form--name-prompt', semantic_alert);

         } else {
            notification_message.append(`<p>Enter your first and last name!</p>`);
            notification_message.children('p').addClass('notification__message--text');
            message = 'Enter first and last name!';
            getPrompt(message, 'contact__form--name-prompt', semantic_alert);
         }
      }
      if (!is_email_valid) {
         if ($('#input-02').val().length === 0) {
            notification_message.append(`<p>Your email address is required!</p>`);
            notification_message.children('p').addClass('notification__message--text');
            message = 'Email address is required!';
            getPrompt(message, 'contact__form--email-prompt', semantic_alert);

         } else {
            notification_message.append(`<p>Your email address is Invalid!</p>`);
            notification_message.children('p').addClass('notification__message--text');
            message = 'Invalid email address!';
            getPrompt(message, 'contact__form--email-prompt', semantic_alert);
         }
      }
      if (!is_message_valid) {
         let characters_left = required_message_length - $('#contact__form--message').val().length;
         let messageData = characters_left + ' more characters required in message!';

         notification_message.append(`<p>${messageData}</p>`);
         notification_message.children('p').addClass('notification__message--text');
         message = characters_left + ' more characters required in message!';
         getPrompt(message, 'contact__form--message-prompt', semantic_alert);
      }
   }

   /**
    * @description -
    */
   function checkFormValidation() {
      if (is_name_valid && is_email_valid && is_message_valid) {
         performValidForm();
      } else {
         performInvalidForm();
      }
   }

   name_input.keyup(checkNameInput);
   email_input.keyup(checkEmailInput);
   message_input.keyup(checkMessageInput);
   submit_button.click(checkFormValidation);
});