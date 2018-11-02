export const base64 = (img) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

        reader.readAsDataURL(img);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject('No se pudo procesar la conversión');
        };
	});
};