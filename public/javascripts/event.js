$(document).ready(function () {

	$(function () {
		$(".edit_event_form .only_numbers").on('input', function (e) {
			if (!/^\d*$/.test(e.target.value)) {
				e.target.value = e.target.value.replace(/\D/g, '');
			}
		});
	});

	function copyToClipBoard(text) {
		return navigator.clipboard.writeText(text).then(() => {
			return Swal.fire({
				text: "Pin Copied",
				icon: 'success',
				buttonsStyling: false,
				confirmButtonText: 'Ok, got it!',
				customClass: {
					confirmButton: 'btn btn-success',
				},
			})
		})
	}

	$(".copy_pin").on('click', function (event) {
		const pin = event.currentTarget.dataset.value;
		return copyToClipBoard(pin);
	});


	$(".delete_event").on('click', function (event) {
		event.preventDefault();
		Swal.fire({
			title: 'Are you sure?',
			text: 'Are you sure you want to delete this event your all images will be deleted if you hit yes?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then((result) => {
			if (result.isConfirmed) {
				const id = event.currentTarget.dataset.id;
				fetch(`/event/${id}`, {
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
		jQuery('.create_event_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				branding_id: { required: true },
				type: { required: true },
				starting_date: { required: true },
				ending_date: { required: true },
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

	$(function () {
		'use strict';
		jQuery('.edit_event_form').validate({
			rules: {
				name: { required: true, maxlength: 255 },
				branding_id: { required: true },
				type: { required: true },
				starting_date: { required: true },
				ending_date: { required: true },
				id: { required: true },
				guest_access_pin: { required: true, minlength: 6, maxlength: 6 },
				full_access_pin: { required: true, minlength: 6, maxlength: 6 },
				photo_selection_with_full_access_pin: { required: true, minlength: 6, maxlength: 6 },
				vip_guest_access_pin: { required: true, minlength: 6, maxlength: 6 },
			},
			messages: {
				name: {
					required: 'Please enter event name.',
					maxlength: "Name can not be more than 255 characters."
				},
				branding_id: {
					required: 'Please select branding.',
				},
				id: {
					required: 'Please enter event id.',
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
				bulk_download: {
					required: 'Please select bulk download.',
				},
				single_download: {
					required: 'Please select single download.',
				},
				guest_access_pin: {
					required: 'Please enter guest access pin.',
					minlength: 'Guest access pin must be 6 characters.',
					maxlength: 'Guest access pin must be 6 characters.',
				},
				full_access_pin: {
					required: 'Please enter full access pin.',
					minlength: 'Full access pin must be 6 characters.',
					maxlength: 'Full access pin must be 6 characters.',
				},
				photo_selection_with_full_access_pin: {
					required: 'Please enter photo selection with full access pin.',
					minlength: 'Photo selection with full access pin must be 6 characters.',
					maxlength: 'Photo selection with full access pin must be 6 characters.',
				},
				vip_guest_access_pin: {
					required: 'Please enter vip guest access pin.',
					minlength: 'Vip guest access pin must be 6 characters.',
					maxlength: 'Vip guest access pin must be 6 characters.',
				}
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
				$('.edit_event_form').find('button[type="submit"]').prop('disabled', true);
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
						$('.edit_event_form').find('button[type="submit"]').prop('disabled', false);
					});
			},
		});
	});

	$(".delete_event_cover_image").on('click', function (event) {
		event.preventDefault();
		Swal.fire({
			title: 'Are you sure?',
			text: 'Are you sure you want to delete this event cover image?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then((result) => {
			if (result.isConfirmed) {
				const id = event.currentTarget.dataset.id;
				fetch(`/event/cover_image/${id}`, {
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
