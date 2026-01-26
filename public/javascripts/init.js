function SwalAlert(response, status) {
	return Swal.fire({
		text: response.message,
		icon: status,
		buttonsStyling: false,
		confirmButtonText: 'Ok, got it!',
		customClass: {
			confirmButton: status === 'success' ? "btn btn-success" : "btn btn-danger",
		},
	}).then((res) => {
		if (res.isConfirmed) {
			if (response.fast_redirect) {
				window.location.href = response.fast_redirect;
				return;
			}
			if (response.redirect) window.location.href = response.redirect;
			if (response.reload) window.location.reload();
		}
	});
}

function FormToJSON(FormElement) {
	///Example Usage
	///var ReceivedJSON = FormDataToJSON(document.getElementById('FormId');)
	var formData = new FormData(FormElement),
		ConvertedJSON = {};
	for (const [key, value] of formData.entries()) {
		ConvertedJSON[key] = value;
	}
	return ConvertedJSON;
}

