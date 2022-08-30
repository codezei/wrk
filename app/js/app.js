// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'


document.addEventListener('DOMContentLoaded', () => {
	
	    //var ajax = myajax.ajaxurl;
		var header = document.getElementById('header');
		var burger = document.getElementById('burger');
	
		if (burger && header) {
			burger.addEventListener('click', function () {
				header.classList.toggle('open');
			});
		}
	
		var cookieAgree = document.getElementById('cookie-agree');
		var cookieWrap = document.getElementById('cookie-policy');
		if (cookieAgree && cookieWrap) {
			var cookieName = 'cookie_policy';
	
			if (!localStorage.getItem(cookieName) && cookieWrap.classList.contains('disable')) {
				cookieWrap.classList.remove('disable');
			}
	
			cookieAgree.addEventListener('click', function () {
				if (!cookieWrap.classList.contains('disable')) {
					localStorage.setItem(cookieName, 'accepted');
					cookieWrap.classList.add('disable');
				}
			});
		}
	
		if (header) {
			if (window.scrollY !== 0 && !header.classList.contains('bg-white')) {
				header.classList.add('bg-white');
			}
	
			window.addEventListener('scroll', function () {
				if (window.scrollY !== 0) {
					if (!header.classList.contains('bg-white')) {
						header.classList.add('bg-white');
					}
				} else {
					if (header.classList.contains('bg-white')) {
						header.classList.remove('bg-white');
					}
				}
			});
		}
	

	// Custom JS
	function customSelect () {
		let selects = document.querySelectorAll('.custom-select')
		if (!selects.length) {
			return
		}

		
		for(let i = 0; i < selects.length; i++) {
			let selectCustomOptionDefault = selects[i].querySelector('.custom-select__option--selected')
			if (selectCustomOptionDefault) {
				let selectCustomValueDefault = selects[i].querySelector('.custom-select__value')
				selectCustomValueDefault.classList.add('custom-select__value--selected')
				selectCustomValueDefault.dataset.default = selectCustomOptionDefault.dataset.option

				let selectValueDefault = selects[i].querySelector('.custom-select__select').value
				selectValueDefault = selectCustomOptionDefault.dataset.option
				selectCustomValueDefault.innerText = selectCustomOptionDefault.innerText
			}



			selects[i].addEventListener('click', function (e) {
				let selectCustomOptions = selects[i].querySelectorAll('.custom-select__option')
				let selectCustomValue = selects[i].querySelector('.custom-select__value')
				let selectValue = selects[i].querySelector('.custom-select__select').value
				if (e.target === selectCustomValue || e.target.classList.contains('page-form__label')) {
					selectCustomValue.classList.toggle('custom-select__value--open')

				} else if (e.target.classList.contains('custom-select__option')) {
					let selectOptionValue = e.target.dataset.option
					let selectOptionName = e.target.innerText
					selectCustomValue.innerText = selectOptionName
					selectValue = selectOptionValue
					selectCustomValue.classList.remove('custom-select__value--open')

					if (!selectCustomValue.classList.contains('custom-select__value--selected')) {
						selectCustomValue.classList.add('custom-select__value--selected')
					}

					for(let s = 0; s < selectCustomOptions.length; s++) {
						if (e.target === selectCustomOptions[s]) {
							selectCustomOptions[s].classList.add('custom-select__option--selected')
						} else {
							selectCustomOptions[s].classList.remove('custom-select__option--selected')
						}
					}
				}
			})
		}
	}


	customSelect ()

	function customPlaceholder () {

		let placeholders = document.querySelectorAll('.page-form__input-placeholder')
		if (!placeholders.length) {
			return
		}
		for (let i = 0; i < placeholders.length; i++) {
			placeholders[i].previousElementSibling.addEventListener('input', function (e) {
				if (e.currentTarget.value) {
					placeholders[i].classList.add('page-form__input-placeholder--disable')
				} else {
					placeholders[i].classList.remove('page-form__input-placeholder--disable')
				}
			}) 
		}
	}

	customPlaceholder()

	function formReset (form) {
		
		function resetCustomSelects () {
			let selects = document.querySelectorAll('.custom-select')
			if (!selects.length) {
				return
			}
			for(let i = 0; i < selects.length; i++) {
				let customSelectValue = selects[i].querySelector('.custom-select__value')
				customSelectValue.classList.remove('custom-select__value--selected')
				customSelectValue.innerText = customSelectValue.dataset.default
				let customSelectOptionSelected = selects[i].querySelector('.custom-select__option--selected')
				customSelectOptionSelected.classList.remove('custom-select__option--selected')
			}
		}
		resetCustomSelects ()
		form.reset()
		function resetCustomPlaceholders () {
			let customPlaceholders = document.querySelectorAll('.page-form__input-placeholder')
			if (!customPlaceholders.length) {
				return
			}
			for( let k = 0; k < customPlaceholders.length; k++) {
				customPlaceholders[k].classList.remove('page-form__input-placeholder--disable')
			}
		}
		resetCustomPlaceholders ()


	}


	function showPopupAfterSubmitForm () {
		let form = document.querySelector(".page-form")
		let popup = document.querySelector(".page-popup")
		if (!popup) {
			return
		}
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (e.currentTarget.querySelector('.error')) {
				return
			}
			popup.classList.add('page-popup--open')
			formReset(form)
		})
		function closePopup () {
			popup.addEventListener('click', function (e) {
				if (e.target === e.currentTarget) {
					popup.classList.remove('page-popup--open')
				}
			})
			let popupCloseBtn = popup.querySelector('.page-popup__close')
			popupCloseBtn.addEventListener('click', function () {
				popup.classList.remove('page-popup--open')
			})
		}
		closePopup () 

	}

	showPopupAfterSubmitForm ()

	function validateFormInputs () {
		let form = document.querySelector('.page-form')
		if (!form) {
			return
		}

		function validateText(field) {
			function isName(name) {
			  let re = /^[a-zA-Zа-яёЇїІіЄєҐґА-ЯЁ\s\-]+$/;
			  return re.test(String(name).toLowerCase());
			}
		
			let nameValue = field.value.trim();
		
			if (nameValue === "" || !isName(nameValue)) {
				field.classList.add("error");
			  field.classList.remove("succes");
			} else {
				field.classList.remove("error");
				field.classList.add("succes");
			}
		}
		function validateEmail(field) {
			function isEmail(email) {
			  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			  return re.test(String(email).toLowerCase());
			}
		
			let emailValue = field.value.trim();
		
			if (emailValue === "" || !isEmail(emailValue)) {
			  field.classList.add("error");
			  field.classList.remove("succes");
			} else {
				field.classList.remove("error");
				field.classList.add("succes");
			}
		  }
		  function validatePhone(field) {
			function isPhone(phone) {
			  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			  return re.test(String(phone).toLowerCase());
			}
		
			let phoneValue = field.value.trim();
		
			if (phoneValue === "" || !isPhone(phoneValue)) {
			  field.classList.add("error");
			  field.classList.remove("succes");
			} else {
				field.classList.remove("error");
				field.classList.add("succes");
			}
		  }
		  function validateDate(field) {
			function isDate(date) {
			  let re = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;
			  return re.test(String(date).toLowerCase());
			}
		
			let dateValue = field.value.trim();
		
			if (dateValue === "" || !isDate(dateValue)) {
			  field.classList.add("error");
			  field.classList.remove("succes");
			} else {
				field.classList.remove("error");
				field.classList.add("succes");
			}
		  }




		for(let i = 0; i < form.length; i++) {
			form[i].addEventListener('change', function () {
				if (form[i].type === "text") {
					if (form[i].dataset.type === "date") {
						validateDate(form[i]) 
					} else {
						validateText(form[i]) 
					}
				} else if (form[i].type === "tel") {
					validatePhone(form[i]) 
				} else if (form[i].type === "email") {
					validateEmail(form[i]) 
				} else if (form[i].tagName === "TEXTAREA") {
					validateText(form[i]) 
				}
			})
			form[i].addEventListener('input', function () {
				if (form[i].type === "text" && form[i].classList.contains('error')) {
					if (form[i].dataset.type === "date") {
						validateDate(form[i]) 
					} else {
						validateText(form[i]) 
					}
				} else if (form[i].type === "tel" && form[i].classList.contains('error')) {
					validatePhone(form[i]) 
				} else if (form[i].type === "email" && form[i].classList.contains('error')) {
					validateEmail(form[i]) 
				} else if (form[i].tagName === "TEXTAREA") {
					validateText(form[i]) 
				}
			})

		}

	}
	validateFormInputs ()


	function filterSlider (activeCategory) {
		let mediaSlides = document.querySelectorAll('.media-slide')
		for (let i = 0; i < mediaSlides.length; i++) {
			if (mediaSlides[i].dataset.filter === activeCategory) {
				mediaSlides[i].style.display = ""
				mediaSlides[i].classList.remove('non-swiper-slide')
				mediaSlides[i].classList.add('swiper-slide')
			} else {
				mediaSlides[i].style.display = "none"
				mediaSlides[i].classList.add('non-swiper-slide')
				mediaSlides[i].classList.remove('swiper-slide')
			}
		}
	}

	let mediaSliderSettings = {
		spaceBetween  : 0,
		slidesPerView : 3,
		loop          : true,
		centeredSlides: true,
		autoplay      : false,
		watchSlidesVisibility: true,
		pagination    : {
			el       : ".media-pagination",
			clickable: true,
			dynamicBullets: true,
		},
		breakpoints: {
			320: {
				slidesPerView : 2
			},
			600: {
				slidesPerView : 3
			}
		}

	}


	function mediaSelect () {
		
		let mediaSelect = document.querySelector('.media-select')
		if (!mediaSelect) {
			return
		}
		let selectMediaOptions = document.querySelectorAll('.media-select__option')
		let selectMediaValue = document.querySelector('.media-select__value')
		let selectValue = document.querySelector('.media-select__select')
		let selectedMediaValue = document.querySelector('.media-select__option')
		selectValue.value = selectedMediaValue.dataset.option
		selectMediaValue.innerText = selectedMediaValue.innerText


		filterSlider(selectValue.value)



		let swiperMedia = new Swiper(".media-slider", mediaSliderSettings);
		



		mediaSelect.addEventListener('click', function (e) {


			if (e.target === selectMediaValue) {
				selectMediaValue.classList.toggle('media-select__value--open')

			} else if (e.target.classList.contains('media-select__option')) {
				let selectOptionValue = e.target.dataset.option
				let selectOptionName = e.target.innerText
				selectMediaValue.innerText = selectOptionName
				// check change value
				if (selectValue.value !== selectOptionValue) {
					swiperMedia.destroy()
					filterSlider(selectOptionValue)
					swiperMedia = new Swiper(".media-slider", mediaSliderSettings);
				}
				selectValue.value = selectOptionValue
				selectMediaValue.classList.remove('media-select__value--open')

				if (!selectMediaValue.classList.contains('media-select__value--selected')) {
					selectMediaValue.classList.add('media-select__value--selected')
				}

				for(let s = 0; s < selectMediaOptions.length; s++) {
					if (e.target === selectMediaOptions[s]) {
						selectMediaOptions[s].classList.add('media-select__option--selected')
					} else {
						selectMediaOptions[s].classList.remove('media-select__option--selected')
					}
				}
			}
			
		})


	}


	mediaSelect ()
})
