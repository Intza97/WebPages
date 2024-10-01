/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
  origin:'top',
  distance:'60px',
  duration:2500,
  delay:400,
})
sr.reveal(`.home__data,.footer__container,.footer__group`)
sr.reveal(`.home__img`,{delay:700,origin:'bottom'})
sr.reveal(`.logos__img,.program__card,.pricing__card`,{interval:100})
sr.reveal(`.choose_img,.calculate__content`,{origin:'left'})
sr.reveal(`.choose__content,.calculate__img`,{origin:'right'})
/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
      calculateCm = document.getElementById('calculate-cm'),
      calculateKg = document.getElementById('calculate-kg'),
      calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
  e.preventDefault();

  // Verificar si los campos tienen un valor
  if (calculateCm.value === '' || calculateKg.value === '') {
    // Añadir y quitar color
    calculateMessage.classList.remove('color-green');
    calculateMessage.classList.add('color-red');
    
    // Mostrar mensaje
    calculateMessage.textContent = 'Llena los campos de Peso y Altura 👩‍💻';

    // Eliminar mensaje en tres segundos
    setTimeout(() => {
      calculateMessage.textContent = '';
    }, 3000);
  } else {
    // Fórmula del IMC
    const cm = calculateCm.value / 100,
          kg = calculateKg.value,
          bmi = Math.round(kg / (cm * cm));

    // Mostrar tu estado de salud
    calculateMessage.classList.remove('color-red'); // Eliminar cualquier color rojo anterior
    calculateMessage.classList.add('color-green'); // Añadir color verde

    if (bmi < 18.5) {
      calculateMessage.textContent = `Tu IMC es ${bmi} y estás delgado 😔`;
    } else if (bmi < 25) {
      calculateMessage.textContent = `Tu IMC es ${bmi} y estás saludable 🥳`;
    } else {
      calculateMessage.textContent = `Tu IMC es ${bmi} y tienes sobrepeso 😔`;
    }

    // Limpiar los campos de entrada
    calculateCm.value = '';
    calculateKg.value = ''; // Corrección aquí, era 'calculatekg'

    // Eliminar mensaje en cuatro segundos
    setTimeout(() => {
      calculateMessage.textContent = '';
    }, 4000);
  }
};

calculateForm.addEventListener('submit', calculateBmi);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendEmail = (e) => {
    e.preventDefault()
    
    // Verificar si el campo tiene un valor
    if (contactUser.value === '') {
        // Añadir y quitar color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        // Mostrar mensaje
        contactMessage.textContent = 'Debes ingresar tu correo electrónico ☝'

        // Eliminar mensaje en tres segundos
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000)
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('serviceID', 'templateID', '#contact-form', 'publicKey')
            .then(() => {
                // Mostrar mensaje y añadir color
                contactMessage.classList.remove('color-red')
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'Te registraste exitosamente 💪'
                // Eliminar mensaje en tres segundos
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) => {
                // Error al enviar correo 
                alert('¡UPS! ALGO HA FALLADO...', error)
            })
        
        // Limpiar el campo de entrada
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)
