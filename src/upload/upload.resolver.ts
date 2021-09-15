import { FilesInput, Files } from "../schema/upload";
import * as fileType from "file-type";
import * as fs from "fs";
import { createWriteStream, unlink } from "fs";
import { FileUpload } from "graphql-upload";
import makeDir from "make-dir";
import path from "path";
import shortId from "shortid";

const __dirname = path.dirname(import.meta.url);

const UPLOAD_DIR = path.resolve(__dirname, "../../uploads");

const dir = path.resolve(__dirname, "../../uploads");
async function storeUpload(upload: any, name: string) {
  const { createReadStream, filename } = (await upload.promise) as FileUpload;
  const stream = createReadStream();
  const storedFileName = `${shortId.generate()}-${filename}`;

  const storedFileUrl = path.resolve(dir, storedFileName);

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedFileUrl);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  const format = await fileType.fromFile(storedFileUrl);
  const newStoredFileName = `${name}.${format.ext}`;
  fs.renameSync(storedFileUrl, path.resolve(dir, newStoredFileName));
  return newStoredFileName;
}

export const upload = async ({
  input,
}: {
  input: FilesInput;
}): Promise<Files> => {
  await makeDir(UPLOAD_DIR);

  const files = await Promise.all(
    input.names.map(async (name, index) => {
      return await storeUpload(input.files[0][index], name);
    })
  );
  return {
    files: files.map((file, index) => ({
      name: input.names[index],
      pureSrc: file,
      src: "/upload/" + file,
    })),
  };
};

export const deleteFile = async ({
  input,
}: {
  input: string[];
}): Promise<Files> => {
  input.forEach((file) => fs.unlinkSync(path.resolve(dir, file)));

  return {
    files: fs.readdirSync(dir).map((file) => ({
      name: file.replace(/\.[^/.]+$/, ""),
      src: "/upload/" + file,
    })),
  };
};

export const uploadList = async (): Promise<Files> => {
  return {
    files: fs.readdirSync(dir).map((file) => ({
      name: file.replace(/\.[^/.]+$/, ""),
      src: "/upload/" + file,
    })),
  };
};
