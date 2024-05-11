import { Data } from '../../types/data/data';
import { FilesStatusesData } from '../../types/data/files-statuses-data';
import { readJSON } from '../../utils/file-system/read-json';
import { writeJSON } from '../../utils/file-system/write-json';

export function writeFileStatus(fileStatuses: FilesStatusesData) {
	const jsonData = readJSON<Data>('.file-status', 'data.json');
	const data = { ...jsonData, fileStatuses };
	writeJSON<Data>('.file-status', 'data.json', data);
}
