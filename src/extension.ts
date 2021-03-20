import * as vscode from "vscode";
import * as fs from "fs";
import junk from "junk";
import { Uri } from "vscode";

var list: string[] = [];
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "directory-files.helloWorld",
    async () => {
      var folder = vscode.window.activeTextEditor?.document.uri.fsPath
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
          list.push(file);
        }
      }

      vscode.window.showQuickPick(list, {}).then((selection) => {
        list = [];
        if (!selection || !folder) {
          return;
        }

        const uri = Uri.joinPath(Uri.file(folder), selection);
        vscode.window.showTextDocument(uri);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  list = [];
}
