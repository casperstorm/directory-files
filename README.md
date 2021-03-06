# Directory Files

Directory Files is a small VSCode extension which allow you to view files in the directory relative to the current open file. Also known as sibling files. This is useful if you are working in a file and want to view files next to it. Eg. when jumping between style and implementation file in a component based project.

![Directory Files](https://github.com/casperstorm/directory-files/raw/master/resources/open-directories.gif)

## Features

Call `Show Files In Directory` to show a quick list with files from the directory relative to the current open file. Or you can add it to `settings.json` like this:

```json
{ "key": "cmd+e", "command": "extension.showDirectoryFiles" }
```

## Settings

| Settings Name                  | Description                         | Default value |
| ------------------------------ | ----------------------------------- | :-----------: |
| `directory-files.showFilePath` | Show file path next to the filename |     false     |

## Installation

You can download the extension from the VSCode marketplace [here](https://marketplace.visualstudio.com/items?itemName=casperstorm.directory-files).

## License

Directory Files is released under the [MIT License.](https://github.com/casperstorm/directory-files/blob/master/LICENSE)
