import * as vscode from "vscode";
import * as fs from "fs";
import junk from "junk";
import { Uri } from "vscode";

var list: string[] = [];
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "directory-files.helloWorld",
    () => {
      var folder = vscode.window.activeTextEditor?.document.uri.fsPath
        .split("/")
        .slice(0, -1)
        .join("/");

      console.log("folder: ", folder);
      if (folder) {
        fs.promises.readdir(folder).then((files) => {
          const filtered = files.filter(junk.not);
          filtered.forEach((file) => {
            const uri = Uri.joinPath(Uri.file(folder!), file);
            if (!fs.lstatSync(uri.fsPath).isDirectory()) {
              list.push(file);
            }
          });
          vscode.window.showQuickPick(list, {}).then((selection) => {
            list = [];
            if (!selection || !folder) {
              return;
            }

            const uri = Uri.joinPath(Uri.file(folder), selection);
            vscode.window.showTextDocument(uri);
          });
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  list = [];
}
