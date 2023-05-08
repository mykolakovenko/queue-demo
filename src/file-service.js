import http from 'node:http';

export const getBase64OfRemoteFile = (fileUrl) => new Promise((resolve, reject) => {
  http.get(fileUrl, (response) => {
    const imageBuffer = [];

    response.on('data', (chunk) => { imageBuffer.push(chunk) });

    response.on('end', () => {
      const finalImageBuffer = Buffer.concat(imageBuffer);
      const base64Image = finalImageBuffer.toString('base64');
      resolve(base64Image);
    });

    response.on('error', (error) => {
      reject(error);
    });
  });
});
