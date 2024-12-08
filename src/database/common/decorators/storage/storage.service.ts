// src/common/storage.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadPath = 'uploads/profile-images';

  /**
   * Supprime un fichier donné.
   * @param filename Nom du fichier à supprimer.
   */
  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.uploadPath, filename);
    try {
      await fs.unlink(filePath);
      this.logger.log(`File deleted successfully: ${filename}`);
    } catch (error) {
      this.logger.error(`Failed to delete file ${filename}: ${error}`);
      throw error;
    }
  }

  /**
   * Vérifie si le répertoire de téléchargement existe, sinon le crée.
   */
  async ensureUploadDirectoryExists(): Promise<void> {
    try {
      await fs.access(this.uploadPath);
    } catch {
      try {
        await fs.mkdir(this.uploadPath, { recursive: true });
        this.logger.log(`Created upload directory: ${this.uploadPath}`);
      } catch (error) {
        this.logger.error(`Failed to create upload directory: ${error}`);
        throw error;
      }
    }
  }
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Logique de téléchargement ici
    return 'file-uploaded-url'; // Retour fictif pour démarrer
  }
}
