$(document).ready(function () {

	$(".delete_branding_button").on('click', function (event) {
		event.preventDefault();
		Swal.fire({
			title: 'Are you sure?',
			text: 'Are you sure you want to delete this branding?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then((result) => {
			if (result.isConfirmed) {
				const id = event.currentTarget.dataset.id;
				fetch(`/branding/${id}`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(async (response) => {
						const responseData = await response.json();
						if (responseData.status !== 'success' || !response.ok) throw responseData;
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
			}
		})
	})
	$(function () {
		'use strict';
		jQuery('.create_branding_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				tagline: { required: false },
				about_us: { required: false },
				contact_number: { required: false },
				contact_email: { required: false },
				website: { required: false },
				facebook: { required: false },
				instagram: { required: false },
				youtube: { required: false },
				linkedin: { required: false },
				whatsapp: { required: false },
				x: { required: false },
				snapchat: { required: false },
				tiktok: { required: false },
				address: { required: false },
				default: { required: false },
			},
			messages: {
				name: {
					required: 'Please enter branding name.',
					maxlength: "Name can not be more than 255 characters."
				}
			},
			errorPlacement: function (error, element) {
				error.addClass('invalid-feedback');
				if (element.parent('.input-group').length) {
					error.insertAfter(element.parent());
				} else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
					error.insertAfter(element.parent().parent());
				} else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
					error.appendTo(element.parent().parent());
				} else if (element.prop('type') === 'password') {
					error.appendTo(element.parent().parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				$('.create_branding_form').find('button[type="submit"]').prop('disabled', true);
				const action = jQuery(form).attr('action');
				const method = jQuery(form).attr('method').toUpperCase();
				const formData = new FormData(form);
				fetch(action, {
					method: method,
					body: formData,
				})
					.then(async (response) => {
						const responseData = await response.json();
						if (responseData.status !== 'success' || !response.ok) throw responseData;
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.create_branding_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
	$(function () {
		'use strict';
		jQuery('.update_branding_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				id: { required: true },
				tagline: { required: false },
				about_us: { required: false },
				contact_number: { required: false },
				contact_email: { required: false },
				website: { required: false, },
				facebook: { required: false, },
				instagram: { required: false, },
				youtube: { required: false, },
				linkedin: { required: false, },
				whatsapp: { required: false, },
				x: { required: false, },
				snapchat: { required: false, },
				tiktok: { required: false, },
				address: { required: false },
				default: { required: false },
			},
			messages: {
				name: {
					required: 'Please enter branding name.',
					maxlength: "Name can not be more than 255 characters."
				},
				id: {
					required: 'Please enter branding id.',
				}
			},
			errorPlacement: function (error, element) {
				error.addClass('invalid-feedback');
				error.insertAfter(element.parent());
				//if (element.parent('.input-group').length) {
				//	error.insertAfter(element.parent());
				//} else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
				//	error.insertAfter(element.parent().parent());
				//} else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
				//	error.appendTo(element.parent().parent());
				//} else if (element.prop('type') === 'password') {
				//	error.appendTo(element.parent().parent());
				//} else {
				//	error.insertAfter(element);
				//}
			},
			submitHandler: function (form) {
				$('.update_branding_form').find('button[type="submit"]').prop('disabled', true);
				const action = jQuery(form).attr('action');
				const method = jQuery(form).attr('method').toUpperCase();
				const formData = new FormData(form);
				fetch(action, {
					method: method,
					body: formData,
				})
					.then(async (response) => {
						const responseData = await response.json();
						if (responseData.status !== 'success' || !response.ok) throw responseData;
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.update_branding_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});

	$(".delete_branding_logo").on('click', function (event) {
		event.preventDefault();
		Swal.fire({
			title: 'Are you sure?',
			text: 'Are you sure you want to delete this branding logo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then((result) => {
			if (result.isConfirmed) {
				const id = event.currentTarget.dataset.id;
				fetch(`/branding/logo/${id}`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(async (response) => {
						const responseData = await response.json();
						if (responseData.status !== 'success' || !response.ok) throw responseData;
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
			}
		})
	});

});
