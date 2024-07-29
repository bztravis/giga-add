# giga-add: the lightning fast git add wrapper

giga-add (play on giga chad) is an interactive wrapper for the git add command which allows you to quickly stage or unstage changes on a per-file basis without removing your fingers from the keyboard or typing out full file paths.

## Usage

`giga-add` lists any untracked files or changes to tracked files in an organized multi-select list. Navigate with arrow keys and press space to toggle a change's staged status. Press enter to save the current state.

It's recommended that you bind a git alias to make invoking giga-add faster. For example, you can add this to your `~/.gitconfig`:

```.gitcongif
[alias]
  ga = !sh -c 'giga-add'
```

### Demo

https://github.com/user-attachments/assets/22f12b1e-639c-4bfd-b4a7-034eb3b63ff9
