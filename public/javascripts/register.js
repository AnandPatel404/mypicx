$(document).ready(function () {

	$(".resend_otp").on('click', function () {
		const data = {
			email: $('.verify_otp_container input[name="email"]').val()
		}
		fetch("/auth/resend_otp", {
			method: "POST",
			body: JSON.stringify(data),
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
	})

	$(function () {
		'use strict';
		jQuery('.send_otp_form').validate({
			rules: {
				email: { required: true },
			},
			messages: {
				email: {
					required: 'Please enter your email',
					email: 'Please enter a valid email',
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
				$('.send_otp_form').find('button[type="submit"]').prop('disabled', true);
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
						$(".send_otp_container").hide();
						$(".verify_otp_container").removeClass("d-none");
						$(".verify_otp_container input[name='email']").val(formData.email);
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.send_otp_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
	$(function () {
		'use strict';

		jQuery('.verify_otp_form').validate({
			rules: {
				email: { required: true, email: true },
				otp_one: { required: true, number: true },
				otp_two: { required: true, number: true },
				otp_three: { required: true, number: true },
				otp_four: { required: true, number: true },
				otp_five: { required: true, number: true },
				otp_six: { required: true, number: true },
			},

			// 🔥 GROUP OTP FIELDS
			groups: {
				otp: "otp_one otp_two otp_three otp_four otp_five otp_six"
			},

			messages: {
				email: {
					required: 'Please enter your email',
					email: 'Please enter a valid email',
				},
				otp_one: {
					required: 'Please enter OTP',
					number: 'Please enter valid OTP',
				},
			},

			errorPlacement: function (error, element) {
				if (element.attr('name').startsWith('otp')) {
					error.addClass('invalid-feedback');
					error.insertAfter('.verify_otp_error'); // single container
				} else {
					error.insertAfter(element);
				}
			},

			submitHandler: function (form) {
				$('.verify_otp_form button[type="submit"]').prop('disabled', true);

				const action = $(form).attr('action');
				const method = $(form).attr('method').toUpperCase();
				const formData = FormToJSON(form);

				const final = {
					email: formData.email,
					otp:
						formData.otp_one +
						formData.otp_two +
						formData.otp_three +
						formData.otp_four +
						formData.otp_five +
						formData.otp_six,
				};

				fetch(action, {
					method,
					body: JSON.stringify(final),
					headers: { 'Content-Type': 'application/json' },
				})
					.then(async (response) => {
						const data = await response.json();
						if (!response.ok || data.status !== 'success') throw data;

						$('.verify_otp_container').hide();
						$('.register_container').removeClass('d-none');
						$(".register_container input[name='email']").val(formData.email);

						return SwalAlert(data, 'success');
					})
					.catch((err) => SwalAlert(err, 'error'))
					.finally(() => {
						$('.verify_otp_form button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
	$(function () {
		'use strict';
		jQuery('.register_form').validate({
			rules: {
				email: { required: true },
				name: { required: true, maxlength: 255 },
				password: { required: true },
			},
			messages: {
				email: {
					required: 'Please enter your email',
					email: 'Please enter a valid email.',
				},
				name: {
					required: 'Please enter your name.',
					maxlength: "Name can not be more than 255 characters."
				},
				password: {
					required: 'Please enter password',
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
				$('.register_form').find('button[type="submit"]').prop('disabled', true);
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
						$(".register").addClass("d-none");
						return SwalAlert(responseData, 'success');
					})
					.catch((error) => {
						return SwalAlert(error, 'error');
					})
					.finally(() => {
						$('.register_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
});
