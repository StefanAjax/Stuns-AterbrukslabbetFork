export default function validateFiles(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error(`Filen ${file.name} är för stor. Maximal storlek är 10 MB.`));
        continue;
      }

      if (!file.type.startsWith("application/pdf")) {
        reject(new Error(`Filen ${file.name} är inte en giltig PDF.`));
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 1) {
      resolve("1 fil har validerats och är redo att laddas upp.");
    } else if (validFiles.length > 1) {
      resolve(`${validFiles.length} filer har validerats och är redo att laddas upp.`);
    } else {
      reject(new Error("Inga giltiga filer hittades."));
    }
  });
}
