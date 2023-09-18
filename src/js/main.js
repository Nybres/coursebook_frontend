addEventListener('DOMContentLoaded', event => {
	let isEdit = false
	const alerts = document.querySelectorAll('.alert')
	if (alerts) {
		alerts.forEach(alert => {
			const deley = setTimeout(() => {
				alert.classList.add('alert__hide')
			}, 2000)
		})
	}

	const backdropActivate = overlay => {
		overlay.classList.add('overlay--active')
		document.body.classList.add('no-scroll')
	}

	const backdropDeActivate = overlay => {
		overlay.classList.remove('overlay--active')
		document.body.classList.remove('no-scroll')
	}

	const drawer = document.querySelector('.drawer')
	if (drawer) {
		const overlay = document.querySelector('.overlay')
		const accountAddBtn = document.querySelector('.jsAccountAdd')
		const drawerBackBtn = drawer.querySelector('.drawer__back')

		accountAddBtn.addEventListener('click', () => {
			drawer.classList.add('drawer--active')
			backdropActivate(overlay)
			isEdit = false
		})

		drawerBackBtn.addEventListener('click', () => {
			drawer.classList.remove('drawer--active')
			backdropDeActivate(overlay)
		})
	}

	const handleShadowNavigation = () => {
		if (window.scrollY > 148) {
			navigationElement.classList.add('nav--shadow')
		} else {
			navigationElement.classList.remove('nav--shadow')
		}
	}

	const navigationElement = document.querySelector('.nav')
	if (navigationElement) {
		window.addEventListener('scroll', handleShadowNavigation)
	}

	//   tworzenie kursu i instruktora
	///////////////////////////////////////////
	const form = document.querySelector('.jsCourseForm')
	if (form) {
		form.addEventListener('submit', e => {
			e.preventDefault()
			const formData = new FormData(form)
			const fileInputs = form.querySelectorAll('input[type="file"]')
			fileInputs.forEach(input => {
				const files = input.files
				for (let i = 0; i < files.length; i++) {
					const file = files[i]
					formData.append('uploaded_images', file)
				}
			})

			const csrfToken = formData.get('csrfmiddlewaretoken')

			fetch('/account-courses', {
				method: 'POST',
				headers: {
					'X-CSRFToken': csrfToken,
				},
				body: formData,
			})
				.then(response => {
					console.log(response)
					if (response.ok) {
						location.reload()
					} else {
						location.reload()
					}
				})
				.catch(error => {
					console.log(error)
				})
		})
	}

	//   poprawić tego JS żeby lepiej działał
	//   zamiast instructorId w js dodac do formularza inputa hidden z ID i ponim potem reszte logiki
	// edycja instruktora
	//   //////////////////////////////
	const instructorForm = document.querySelector('.jsInstructorForm')
	const instructorEditBtns = document.querySelectorAll('.jsInstructorEdit')
	let instructorId
	instructorEditBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			isEdit = true
			instructorId = btn.dataset.id
			fetch('/edit-instructor/' + instructorId, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					const overlay = document.querySelector('.overlay')
					backdropActivate(overlay)
					drawer.classList.add('drawer--active')
					instructorForm.querySelector("[name='first_name']").value = data.first_name
					instructorForm.querySelector("[name='last_name']").value = data.last_name
					instructorForm.querySelector("[name='description']").value = data.description
					// tu trzeba zmienić potem bo cały czas jest form i jest margines
					if (data.photo) {
						const photoPreview = instructorForm.querySelector('.photo-preview')
						photoPreview.src = data.photo_thumb
					}
				})
		})
	})

	if (instructorForm) {
		instructorForm.addEventListener('submit', e => {
			e.preventDefault()
			const formData = new FormData(instructorForm)
			const csrfToken = formData.get('csrfmiddlewaretoken')
			fetch(isEdit ? '/edit-instructor/' + instructorId : '/account-instructors', {
				method: isEdit ? 'PUT' : 'POST',
				headers: {
					'X-CSRFToken': csrfToken,
				},
				body: formData,
			})
				.then(response => {
					instructorForm.reset()
					console.log(response)
					if (response.ok) {
						location.reload()
					} else {
						location.reload()
					}
				})
				.catch(error => {
					console.log(error)
				})
		})
	}

	const formImages = document.querySelectorAll('.form__images-image')
	formImages.forEach(image => {
		image.addEventListener('change', e => {
			const input = image.querySelector('input')
			const fileNameSpan = image.querySelector('span')
			if (input.files.length > 0) {
				fileNameSpan.textContent = `${input.files[0].name}`
			} else {
				fileNameSpan.textContent = 'Wybierz zdjęcie'
			}
		})
	})

	// const addFormImage = document.querySelector('.jsAddImage')
	// if (addFormImage) {
	// 	const imagesContainer = document.querySelector('.form__images')

	// 	addFormImage.addEventListener('click', e => {
	// 		e.preventDefault()
	// 		const input = document.createElement('input')
	// 		input.classList.add('form__group-input')
	// 		input.type = 'file'
	// 		input.name = 'images'
	// 		input.addEventListener('change', e => {
	// 			const selectedFile = e.target.files[0]
	// 			if (selectedFile) {
	// 				const imageContainer = document.createElement('div')
	// 				const deleteElement = document.createElement('div')
	// 				const imageElement = document.createElement('img')
	// 				imageContainer.classList.add('form__images-image')
	// 				deleteElement.classList.add('form__images-delete')
	// 				deleteElement.innerHTML = `
	// 	  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
	// 	  fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
	// 	  stroke-linejoin="round" class="feather feather-x">
	// 	  <line x1="18" y1="6" x2="6" y2="18"></line>
	// 	  <line x1="6" y1="6" x2="18" y2="18"></line>
	//   		</svg>
	//   		`
	// 				imageElement.width = 150
	// 				imageElement.height = 150
	// 				imageElement.loading = 'lazy'
	// 				imageElement.src = `https://placehold.co/150x150?text=${selectedFile.name}`
	// 				imagesContainer.appendChild(imageContainer)
	// 				imageContainer.appendChild(deleteElement)
	// 				imageContainer.appendChild(imageElement)
	// 				imageContainer.insertBefore(input, imageContainer.lastChild)
	// 				deleteElement.addEventListener('click', e => {
	// 					const elementToDelete = e.target.closest('.form__images-image')
	// 					elementToDelete.remove()
	// 				})
	// 			}
	// 		})
	// 		input.click()
	// 	})
	// }

	// THE END
})
