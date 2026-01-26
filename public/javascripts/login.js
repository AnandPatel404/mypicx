$(document).ready(function () {

	jQuery('.google_login').on('click', async function (e) {
		e.preventDefault();
		$('.login_user').find('button[type="button"]').prop('disabled', true);
		window.open('/auth/google/callback', '_top');
		$('.login_user').find('button[type="button"]').prop('disabled', false);
	});
	$(function () {
		'use strict';
		jQuery('.login_user').validate({
			rules: {
				email: { required: true },
				password: { required: true },
			},
			messages: {
				email: {
					required: 'Please enter your email',
					email: 'Please enter a valid email',
				},
				password: {
					required: 'Please enter password',
				},
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
				$('.login_user').find('button[type="submit"]').prop('disabled', true);
				const action = jQuery(form).attr('action');
				const method = jQuery(form).attr('method').toUpperCase();
				const formData = FormToJSON(form);

				fetch(action, {
					method: method,
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(async (response) => {
						const responseData = await response.json();
						if (responseData.status !== 'success' || !response.ok) throw responseData;
						SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.login_user').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
});
