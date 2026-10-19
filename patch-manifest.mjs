import fs from 'node:fs';
const file = 'android/app/src/main/AndroidManifest.xml';
let xml = fs.readFileSync(file, 'utf8');
if (!xml.includes('android.permission.CAMERA')) {
  xml = xml.replace('<application', '    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n    <application');
  fs.writeFileSync(file, xml, 'utf8');
}
console.log('Camera permission added to Android manifest.');
