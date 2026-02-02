$(document).ready(function () {

	$(function () {
		'use strict';
		jQuery('.change_password').validate({
			rules: {
				current_password: { required: true },
				new_password: { required: true },
				confirm_password: { required: true },
			},
			messages: {
				current_password: {
					required: 'Please enter your current password',
				},
				new_password: {
					required: 'Please enter your new password',
				},
				confirm_password: {
					required: 'Please enter your confirm password',
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
				$('.change_password').find('button[type="submit"]').prop('disabled', true);
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
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.change_password').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
});
