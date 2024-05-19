import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFile } from 'fs/promises';

let app: admin.app.App = {} as admin.app.App;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const firebaseServiceAccountFile = await readFile(
      './config/firebaseServiceAccountKey.json',
      'utf8',
    );
    const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  setup() {
    return app;
  }
}
