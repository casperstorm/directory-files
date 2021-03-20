import * as vscode from "vscode";
import * as fs from "fs";
import junk from "junk";
import { Uri, QuickPickItem } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const { showFilePath } = vscode.workspace.getConfiguration("directory-files");
  let directoryFiles: QuickPickItem[] = [];
  const disposable = vscode.commands.registerCommand(
    "extension.showDirectoryFiles",
    async () => {
      let folder = vscode.window.activeTextEditor?.document.uri.fsPath
        .split("/")
        .slice(0, -1)
        .join("/");
      if (!folder) {
        vscode.window.showWarningMessage("Can't find parent folder.");
        return;
      }

      const files = await fs.promises.readdir(folder);
      const filtered = files.filter(junk.not);
      for (const file of filtered) {
        const uri = Uri.joinPath(Uri.file(folder!), file);
        const stats = await fs.promises.lstat(uri.fsPath);
        if (stats.isFile()) {
          directoryFiles.push({
            label: file,
            // @todo (casperstorm): would like relative path rather than the full fs dir.
            description: showFilePath ? folder : undefined,
          });
        }
      }

      vscode.window
        .showQuickPick(directoryFiles, { placeHolder: "Search files by name" })
        .then((selection) => {
          directoryFiles = [];

          if (!selection || !folder) {
            return;
          }

          const uri = Uri.joinPath(Uri.file(folder), selection.label);
          vscode.window.showTextDocument(uri);
        });
    }
  );

  context.subscriptions.push(disposable);
}
