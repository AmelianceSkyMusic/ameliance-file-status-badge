import * as fs from 'fs';
import * as path from 'path';
import { getWorkspaceFolderPath } from '../../helpers/path/get-workspace-folder-path';

export function writeJSON<T = Record<string, unknown>>(filePath: string, file: string, data: T) {
	const workspaceFolder = getWorkspaceFolderPath() || '';

	const fileStatusFolderPath = path.join(workspaceFolder, filePath);
	if (!fs.existsSync(fileStatusFolderPath)) {
		fs.mkdirSync(fileStatusFolderPath);
	}

	const fileStatusPath = path.join(fileStatusFolderPath, file);
	fs.writeFileSync(fileStatusPath, JSON.stringify(data, null, 3), 'utf-8');
}
