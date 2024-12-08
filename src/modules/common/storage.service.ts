// src/modules/common/storage.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly uploadPath = path.join(__dirname, '..', '..', 'uploads');

  /**
   * Upload un fichier et retourne son chemin.
   * @param file Le fichier à uploader.
   * @returns Le chemin du fichier uploadé.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      // Générer un nom de fichier unique
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(this.uploadPath, filename);

      // Assurez-vous que le répertoire d'upload existe
      fs.mkdirSync(this.uploadPath, { recursive: true });

      // Sauvegarder le fichier
      fs.writeFileSync(filePath, file.buffer);

      // Retourner le chemin relatif du fichier
      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Failed to upload file', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }
}
