import os from 'os';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';
import { getBase64OfRemoteFile } from './file-service.js';
import { uploadFileToS3 } from './s3-service.js';


const generateSignature = () => new Promise(resolve => {
  crypto.pbkdf2(new Date().getTime().toString(), 'salt', 100000, 512, 'sha512', (error, value) => {
    resolve(value.toString('hex'));
  });
});

export const generatePdf = async (user) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(`User profile`, 10, 10);

  doc.setFontSize(14);
  doc.text(`ID: ${user.id}`, 10, 20);
  doc.text(`Name: ${user.name}`, 10, 30);
  doc.text(`Email: ${user.email}`, 10, 40);
  doc.text('Profile picture:', 10, 50);

  const image = await getBase64OfRemoteFile(user.avatarUrl);
  doc.addImage(image, 'JPEG', 10, 60, 160, 120);

  const signature = await generateSignature();
  doc.text(`Signature: ${signature}`, 10, 270);

  const localFilePath = `${os.tmpdir()}/${user.id}.pdf`;
  await doc.save(localFilePath);

  const url = await uploadFileToS3(localFilePath, `${user.id}.pdf`);

  return { url }
}
