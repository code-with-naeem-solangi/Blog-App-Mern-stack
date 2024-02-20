const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "doggnzlqb",
  api_key: "918332632368698",
  api_secret: "***************************",
});
exports.uploadImage = (file) => {
  console.log("files", file?.path);

  const fileBuffer = file.buffer;
  console.log("fileBuffer", fileBuffer);

  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      })
      .end(fileBuffer);
  });
};
