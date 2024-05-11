import * as fs from 'fs';
import * as path from 'path';
import { getWorkspaceFolderPath } from '../../helpers/path/get-workspace-folder-path';

export function readJSON<T = Record<string, unknown>>(filePath: string, file: string): T | null {
	try {
		const workspaceFolder = getWorkspaceFolderPath() || '';
		const fileStatusFolderPath = path.join(workspaceFolder, filePath);
		const fileStatusPath = path.join(fileStatusFolderPath, file);

		if (fs.existsSync(fileStatusPath)) {
			const data = fs.readFileSync(fileStatusPath, 'utf-8');
			return JSON.parse(data);
		} else {
			return null;
		}
	} catch {
		return null;
	}
}
