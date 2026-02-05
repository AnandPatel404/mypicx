$(document).ready(function () {
	$(function () {
		'use strict';
		jQuery('.create_collection_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				event_id: { required: true },
			},
			messages: {
				name: {
					required: 'Please enter branding name.',
					maxlength: "Name can not be more than 255 characters."
				},
				event_id: {
					required: 'Please enter event id.',
				}
			},
			errorPlacement: function (error, element) {
				error.addClass('invalid-feedback');
				error.insertAfter(element);
			},
			submitHandler: function (form) {
				$('.create_collection_form').find('button[type="submit"]').prop('disabled', true);
				const action = jQuery(form).attr('action');
				const method = jQuery(form).attr('method').toUpperCase();
				const formData = new FormToJSON(form);
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
						$('.create_collection_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});

});
