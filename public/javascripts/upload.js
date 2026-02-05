$(document).ready(function () {

	let selectedFiles = [];
	const uploads = {};
	const MAX_PARALLEL = 3;
	let active = 0;
	let queue = [];

	// =========================
	// SELECT FILES
	// =========================
	$("#filePicker").on("change", function () {
		selectedFiles = Array.from(this.files);
		$("#filePreviewList").empty();

		selectedFiles.forEach((file, index) => {
			const row = $(`
        <div class="file-row" data-index="${index}">
          <strong>${file.name}</strong>
          <span class="size">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
          <div class="progress mt-1">
            <div class="progress-bar" style="width:0%"></div>
          </div>
          <button class="btn btn-sm btn-danger cancel mt-1" disabled>Cancel</button>
          <span class="status">Waiting</span>
          <hr>
        </div>
      `);

			$("#filePreviewList").append(row);
		});
	});

	// =========================
	// CLICK UPLOAD
	// =========================
	$("#startUploadBtn").on("click", function () {
		queue = [...selectedFiles];
		processQueue();
	});

	// =========================
	function processQueue() {
		if (active >= MAX_PARALLEL) return;
		if (queue.length === 0) return;

		const file = queue.shift();
		startUpload(file);
		processQueue();
	}

	// =========================
	function startUpload(file) {
		active++;

		const index = selectedFiles.indexOf(file);
		const row = $(`.file-row[data-index="${index}"]`);

		const bar = row.find(".progress-bar");
		const status = row.find(".status");
		const cancelBtn = row.find(".cancel");

		status.text("Uploading...");
		cancelBtn.prop("disabled", false);

		const collection_id = $("#UploadModel select[name='collection_id']").val();
		const event_id = $("#UploadModel input[name='event_id']").val();

		console.log(collection_id, event_id);


		const formData = new FormData();
		formData.append("file", file);
		formData.append("collection_id", collection_id);
		formData.append("event_id", event_id);


		const source = axios.CancelToken.source();
		uploads[index] = source;

		axios.post("/upload/file", formData, {
			cancelToken: source.token,
			onUploadProgress: e => {
				const percent = Math.round((e.loaded * 100) / e.total);
				bar.css("width", percent + "%");
			}
		})
			.then(() => {
				status.text("Completed ✅");
				cancelBtn.remove();
			})
			.catch(err => {
				if (axios.isCancel(err)) {
					row.remove();
				} else {
					status.text("Error ❌");
				}
			})
			.finally(() => {
				active--;
				delete uploads[index];
				processQueue();
			});

		cancelBtn.on("click", () => {
			source.cancel();
			row.remove();
			active--;
			processQueue();
		});
	}
});