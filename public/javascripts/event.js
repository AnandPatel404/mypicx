$(document).ready(function () {

	//$(".delete_branding_button").on('click', function (event) {
	//	event.preventDefault();
	//	Swal.fire({
	//		title: 'Are you sure?',
	//		text: 'Are you sure you want to delete this branding?',
	//		icon: 'warning',
	//		showCancelButton: true,
	//		confirmButtonColor: '#3085d6',
	//		cancelButtonColor: '#d33',
	//		confirmButtonText: 'Yes',
	//	}).then((result) => {
	//		if (result.isConfirmed) {
	//			const id = event.currentTarget.dataset.id;
	//			fetch(`/branding/${id}`, {
	//				method: "DELETE",
	//				headers: {
	//					'Content-Type': 'application/json',
	//				},
	//			})
	//				.then(async (response) => {
	//					const responseData = await response.json();
	//					if (responseData.status !== 'success' || !response.ok) throw responseData;
	//					return SwalAlert(responseData, 'success');
	//				})
	//				.catch((error) => {
	//					return SwalAlert(error, 'error');
	//				})
	//		}
	//	})
	//})

	$(function () {
		'use strict';
		jQuery('.create_event_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				branding_id: { required: true },
				type: { required: true },
				starting_date: { required: true },
				ending_date: { required: true },
				description: { required: false },
			},
			messages: {
				name: {
					required: 'Please enter event name.',
					maxlength: "Name can not be more than 255 characters."
				},
				branding_id: {
					required: 'Please select branding.',
				},
				type: {
					required: 'Please select event type.',
				},
				starting_date: {
					required: 'Please select starting date.',
				},
				ending_date: {
					required: 'Please select ending date.',
				},
			},
			errorPlacement: function (error, element) {

				error.addClass('invalid-feedback');
				if (element.parent('.input-group').length) {
					error.insertAfter(element.parent());
				} else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
					error.insertAfter(element.parent().parent());
				} else if (element.prop('type') === "select-one") {
					error.appendTo(element.parent());
				}
				else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
					error.appendTo(element.parent().parent());
				} else if (element.prop('type') === 'password') {
					error.appendTo(element.parent().parent());
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				$('.create_event_form').find('button[type="submit"]').prop('disabled', true);
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
						$('.create_event_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});
});
