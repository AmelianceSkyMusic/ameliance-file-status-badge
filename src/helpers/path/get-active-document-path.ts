import * as vscode from 'vscode';

export function getActiveDocumentPath() {
	return vscode.window.activeTextEditor?.document.uri.fsPath || null;
}
