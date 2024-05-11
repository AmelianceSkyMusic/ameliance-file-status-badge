import { Data } from '../../types/data/data';
import { readJSON } from '../../utils/file-system/read-json';

export function readFileStatus() {
	const data = readJSON<Data>('.file-status', 'data.json');
	return data?.fileStatuses || [];
}
