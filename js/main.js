/**
 * mahdi-abdurrahman-portfolio-scripts
 * @author Mahdi Abdurrahman
 * @version 1.0.0
 * @date 9 December 2025
 */

'use strict';
/*===============================================================
          preloader scripts
 ==================================================================*/
document.addEventListener('DOMContentLoaded', function () {
   // makes sure that whole site is loaded, so the 3000ms preloader coincides with
   // the delay of 3000ms for the header content animation
  const preloader = document.getElementById('preloader');
   const preloader_gif = document.getElementById('preloader__gif');


   if (preloader_gif) {
      preloader_gif.style.transition = 'opacity 3000ms ease-in-out';
      preloader_gif.style.opacity = '0';

   }
   if (preloader) {
      preloader.style.transition = 'opacity 3000ms ease-in-out';
      preloader.style.opacity = '0';
   }

   setTimeout(function () {
      preloader_gif.style.display = 'none';
      preloader.style.display = 'none';
   }, 3000);
});

/*===============================================================
          navigation and scroll-spy scripts
==================================================================*/
$(function () {

   /************** navigation and footer navigation **************/
   // the regular height sections
   const short_options = {
      rootMargin: '0px', threshold: 0.7,
   }
   // the longer height section, especially the portfolio section
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
    * @returns {void}
    */
   function removeNavigationLinksActiveClass() {
      navigation_links.forEach(navigation_link => {
         navigation_link.classList.remove('active');
      })
   }

   /**
    * @description - removes active class from footer navigation links
    * @returns {void}
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
    * @returns {void}
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
    * @returns {void}
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
    * @description - toggles the active class for the navigation_button, navigation_button-bars,
    * navigation_background, and navigation_list
    * @returns {void}
    */
   function toggleNavigation() {
      document.querySelector('.navigation__button').classList.toggle('active');
      document.querySelector('.navigation__background').classList.toggle('active');
      document.querySelector('.navigation__list').classList.toggle('active');
      document.querySelector('body').classList.toggle('utils-no-scroll');
   }

   /**
    * @description - removes the active class on the navigation_button, navigation_background,
    * navigation_list and removes the no-scroll class on the body. Thus, closing the navigation
    * when the navigation_list or navigation_item is clicked.
    * @returns {void}
    */
   function closeNavigation() {
      document.querySelector('.navigation__button').classList.remove('active');
      document.querySelector('.navigation__background').classList.remove('active');
      document.querySelector('.navigation__list').classList.remove('active');
      document.querySelector('body').classList.remove('utils-no-scroll');
   }

   document.querySelector('#navigation__button').addEventListener('click', toggleNavigation);
   document.querySelector('#navigation__list, .navigation__item').addEventListener('click', closeNavigation);

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
   document.querySelectorAll('#portfolio__filters > .js-filter').forEach(function(filter) {
      filter.addEventListener('click', function() {
         document.querySelectorAll('#portfolio__filters > .js-filter').forEach(function(sibling) {
            sibling.classList.remove('active');
         });
         this.classList.add('active');
      });
   });

   const filter_link_items = document.querySelectorAll('.js-filter');

   /**
    * @description - removes the active class from the filter link items
    * @returns {void}
    */
   function removeFilterLinkItemsActiveClass() {
      filter_link_items.forEach(filter_link_item => {
         filter_link_item.classList.remove('active');
      })
   }

   /**
    * @description - add the active class to the filter link item that was clicked
    * @param e - the event of the click
    * @returns {void}
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
   $('.filtr-container').filterizr({});
});

/*===============================================================
          contact section
==================================================================*/
$(function () {
   $('#contact__section--title-paragraph').waypoint(function () {
      var typed5 = new Typed('#contact__section--paragraph', {
         strings: ['If you have any', 'If you have any questions or wish', 'If you have any questions or wish to collaborate,', 'If you have any questions or wish to collaborate, send me a message! ',],
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
   document.querySelector('.utils-effect-07').value = '';

   document.querySelectorAll('.js-effect-07 .utils-effect-07').forEach(function(element) {
      element.addEventListener('focusout', function() {
         if (this.value !== '') {
            this.classList.add('has-content');

         } else {
            this.classList.remove('has-content');

         }
      });
   });


   function removeJSEffect() {
      document.querySelector('.utils-effect-07').value = '';
      document.querySelectorAll('.js-effect-07 .utils-effect-07').forEach(function(element) {
         element.classList.remove('has-content');

      });
   }

   //**************** form validation scripts ****************//
   /*const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|I|II|III|IV))?$/g;*/
   const name_pattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;
   const required_message_length = 30;

   const semantic_success = '#166534';
   const semantic_alert = '#991B1B';

   let is_name_valid = false;
   let is_email_valid = false;
   let is_message_valid = false;

   const name_input = document.getElementById('input-01');
   const email_input = document.getElementById('input-02');
   const message_input = document.getElementById('contact__form--message');
   const notification_message = document.getElementById('notification__message');
   const notification_title = document.getElementById('notification__message--title');
   const submit_button = document.getElementById('contact__form--submit');

   let name_prompt = document.getElementById('contact__form--name-prompt');
   let email_prompt = document.getElementById('contact__form--email-prompt');
   let message_prompt = document.getElementById('contact__form--message-prompt');
   let message = '';

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
      if (object == null) {
         return '';
      }
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
    * @returns {void}
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
   function validateName() {
      let name = name_input.value;
      message = '';

      if (name.length === 0) {
         message = 'Your first and last name are required!';
         is_name_valid = false;
         getPrompt(message, `${name_prompt.id}`, semantic_alert);

         return false;
      }
      if (!name.match(name_pattern)) {
         message = 'Enter first and last name!';
         is_name_valid = false;
         getPrompt(message, `${name_prompt.id}`, semantic_alert);

         return false;
      }

      message = 'Welcome ' + name;
      is_name_valid = true;
      getPrompt(message, `${name_prompt.id}`, semantic_success);

      return true;
   }

   /**
    * @description - checks whether input for email is valid or not, and adds an
    * interactive validation message
    * @returns {boolean} - if input is valid, returns true; otherwise, return false
    */
   function validateEmail() {
      let email = email_input.value;
      message = '';

      if (email.length === 0) {
         message = 'Your email address is required!';
         is_email_valid = false;
         getPrompt(message, `${email_prompt.id}`, semantic_alert);

         return false;
      }
      if (!email.match(email_pattern)) {
         message = 'Invalid email address!';
         is_email_valid = false;
         getPrompt(message, `${email_prompt.id}`, semantic_alert);

         return false;
      }

      message = 'Valid email address';
      is_email_valid = true;
      getPrompt(message, `${email_prompt.id}`, semantic_success);

      return true;
   }

   /**
    * @description - checks whether the textarea for the message is valid or not, and
    * adds an interactive validation message
    * @returns {boolean} - if input is valid, returns true; otherwise, return false
    */
   function validateMessage() {
      let form_message = message_input.value;
      form_message = removeHTMLTags(form_message);
      message = '';

      let characters_left = required_message_length - form_message.length;

      if (form_message.length < required_message_length) {
         message = characters_left + ' more characters required in message!';
         is_message_valid = false;
         getPrompt(message, `${message_prompt.id}`, semantic_alert);

         return false;

      } else {
         message = 'Valid message';
         is_message_valid = true;
         getPrompt(message, `${message_prompt.id}`, semantic_success);

         return true;
      }
   }

   /**
    * @description - performs the invalid form action and shows the notification message
    * @returns {void}
    */
   function performInvalidForm() {
      if (timeoutID1) {
         clearTimeout(timeoutID1);
         clearTimeout(timeoutID2);
      }

      notification_message.style.display = 'block';
      notification_title.innerHTML = `<h4 class='utils-text-center'>Error!</h4>`;
      notification_title.classList.add('.notification__message--title');
      notification_message.classList.add('move-in-from-right', 'notification__error');
      updateErrors();

      timeoutID1 = setTimeout(() => {
         notification_message.classList.add('exit-to-left');
         notification_message.classList.remove('move-in-from-right');
         timeoutID2 = setTimeout(() => {
            notification_message.classList.remove('exit-to-left');
            notification_message.style.display = 'none';
         }, 1500);
      }, 3500);
   }

   /**
    * @description - performs the valid form action and shows the notification message
    * @returns {void}
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
         submit_button.innerHTML = 'Valid Form';

      }, 1500);

      submit_button.classList.add('valid');

      timeoutID4 = setTimeout(function () {
         submit_button.value = 'Sending Message...';

      }, 1500);

      submit_button.disabled = true;

      if (submit_button.classList.contains('valid')) {

         timeoutID5 = setTimeout(function () {
            submit_button.value = 'Message Sent';

            /* show notification message with success */
            notification_message.style.display = 'block';
            notification_message.classList.add('move-in-from-right', 'notification__success');
            notification_message.innerHTML = `<h4 class='utils-text-center'>Success!</h4><p class='notification__message--text'>Your message was successfully sent.</p>`;

            timeoutID6 = setTimeout(() => {
               notification_message.classList.add('exit-to-left');
               notification_message.classList.remove('move-in-from-right');

               timeoutID7 = setTimeout(() => {
                  notification_message.classList.remove('exit-to-left');
                  notification_message.style.display = 'none';
               }, 5500);
            }, 8000);
         }, 5000);
      }
      resetForm();
   }

   function resetContactFormInputPrompts() {
      name_prompt.innerHTML = '';
      email_prompt.innerHTML = '';
      message_prompt.innerHTML = '';
      name_prompt.value = '&nbsp;';
      email_prompt.value = '&nbsp;';
      message_prompt.value = '&nbsp;';
   }

   /**
    * @description - resets the form and clears all the timeouts
    * @returns {void}
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
         // location.reload();

         timeoutID9 = setTimeout(() => {
            name_input.value = '';
            email_input.value = '';
            message_input.value = '';
            submit_button.value = 'Send Message';
            submit_button.classList.remove('valid');
            submit_button.disabled = false;
            is_name_valid = false;
            is_email_valid = false;
            is_message_valid = false;
            resetContactFormInputPrompts();
            removeJSEffect();

         }, 2000);
      }, 13500);
   }

   /**
    * @description - updates the error message in the notification message
    * @returns {void}
    */
   function updateErrors() {
      let message = '';
      notification_message.innerHTML = `<h4 class='notitication__message--title utils-text-center'>Error!</h4><p class='notification__message--text'>The following are error(s) in the form:</p>`;

      if (!is_name_valid) {
         if (name_input.value.length === 0) {
            notification_message.innerHTML += `<p class='notification__message--text'>Your first and last names are required!</p>`;
            message = 'First and last names are required!';
            getPrompt(message, 'contact__form--name-prompt', semantic_alert);

         } else {
            notification_message.innerHTML += `<p class='notification__message--text'>Enter your first and last name!</p>`;
            message = 'Enter first and last name!';
            getPrompt(message, 'contact__form--name-prompt', semantic_alert);
         }
      }
      if (!is_email_valid) {
         if (email_input.value.length === 0) {
            notification_message.innerHTML += `<p class='notification__message--text'>Your email address is required!</p>`;
            message = 'Email address is required!';
            getPrompt(message, 'contact__form--email-prompt', semantic_alert);

         } else {
            notification_message.innerHTML += `<p class='notification__message--text'>Your email address is Invalid!</p>`;
            message = 'Email address is Invalid!';
            getPrompt(message, 'contact__form--email-prompt', semantic_alert);
         }
      }
      if (!is_message_valid) {
         let characters_left = required_message_length - message_input.value.length;
         let messageData = characters_left + ' more characters required in message!';

         notification_message.innerHTML += `<p class='notification__message--text'>${messageData}</p>`;
         message = characters_left + ' more characters required in message!';
         getPrompt(message, 'contact__form--message-prompt', semantic_alert);
      }
   }

   /**
    * @description - validates the contact form and performs actions based on the validation. IF
    * the form is valid, it performs the valid form actions; otherwise, it performs the invalid
    * form actions.
    * @returns {void}
    */
   function validateForm() {
      if (is_name_valid && is_email_valid && is_message_valid) {
         performValidForm();

      } else {
         performInvalidForm();

      }
   }

   name_input.addEventListener('keyup', validateName);
   email_input.addEventListener('keyup', validateEmail);
   message_input.addEventListener('keyup', validateMessage);
   submit_button.addEventListener('click', validateForm);


});