// File I/O utilities for export/import functionality
export class FileIO {
  
  // Export data as JSON file
  static exportToJSON(data: unknown, filename = 'promptgen-export.json'): boolean {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      this.downloadFile(blob, filename);
      return true;
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      return false;
    }
  }

  // Export data as text file
  static exportToText(text: string, filename = 'prompt-export.txt'): boolean {
    try {
      const blob = new Blob([text], { type: 'text/plain' });
      this.downloadFile(blob, filename);
      return true;
    } catch (error) {
      console.error('Error exporting to text:', error);
      return false;
    }
  }

  // Download file helper
  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Import JSON file
  static async importFromJSON(file: File): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
      const text = await this.readFileAsText(file);
      const data = JSON.parse(text);
      return { success: true, data };
    } catch (error) {
      console.error('Error importing JSON:', error);
      return { success: false, error: error.message };
    }
  }

  // Import text file
  static async importFromText(file: File): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
      const text = await this.readFileAsText(file);
      return { success: true, data: text };
    } catch (error) {
      console.error('Error importing text:', error);
      return { success: false, error: error.message };
    }
  }

  // Read file as text
  static readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  // Validate JSON structure for import
  static validateImportData(data: any, type: 'presets' | 'history' = 'presets'): { valid: boolean; error?: string } {
    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'Invalid data format' };
    }

    switch (type) {
      case 'presets':
        if (!Array.isArray(data.presets)) {
          return { valid: false, error: 'Presets data must contain an array of presets' };
        }
        // Validate each preset has required fields
        for (const preset of data.presets) {
          if (!preset.id || !preset.name || !preset.config) {
            return { valid: false, error: 'Each preset must have id, name, and config fields' };
          }
        }
        return { valid: true };
      
      case 'history':
        if (!Array.isArray(data.history)) {
          return { valid: false, error: 'History data must contain an array of history items' };
        }
        return { valid: true };

      default:
        return { valid: true };
    }
  }

  // File System Access API support (where available)
  static async saveToDirectory(data: any, filename: string, type: 'json' | 'text' = 'json'): Promise<{ success: boolean; handle?: FileSystemFileHandle; fallback?: boolean; error?: string }> {
    try {
      // Check if File System Access API is supported
      if ('showSaveFilePicker' in window) {
        const options = {
          suggestedName: filename,
          types: [{
            description: type === 'json' ? 'JSON files' : 'Text files',
            accept: {
              [type === 'json' ? 'application/json' : 'text/plain']: 
                [type === 'json' ? '.json' : '.txt']
            }
          }]
        };

        const fileHandle = await window.showSaveFilePicker(options);
        const writable = await fileHandle.createWritable();
        
        const content = type === 'json' 
          ? JSON.stringify(data, null, 2)
          : data;
          
        await writable.write(content);
        await writable.close();
        
        return { success: true, handle: fileHandle };
      } else {
        // Fallback to traditional download
        if (type === 'json') {
          this.exportToJSON(data, filename);
        } else {
          this.exportToText(data, filename);
        }
        return { success: true, fallback: true };
      }
    } catch (error) {
      console.error('Error saving to directory:', error);
      return { success: false, error: error.message };
    }
  }

  // Load from directory (File System Access API)
  static async loadFromDirectory(): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
      if ('showOpenFilePicker' in window) {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'JSON and Text files',
            accept: {
              'application/json': ['.json'],
              'text/plain': ['.txt']
            }
          }]
        });

        const file = await fileHandle.getFile();
        const extension = file.name.split('.').pop().toLowerCase();
        
        if (extension === 'json') {
          return await this.importFromJSON(file);
        } else {
          return await this.importFromText(file);
        }
      } else {
        throw new Error('File System Access API not supported');
      }
    } catch (error) {
      console.error('Error loading from directory:', error);
      return { success: false, error: error.message };
    }
  }
}
