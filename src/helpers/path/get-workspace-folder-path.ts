import * as vscode from 'vscode';

export function getWorkspaceFolderPath() {
	return vscode.workspace.workspaceFolders?.[0].uri.fsPath;
}
