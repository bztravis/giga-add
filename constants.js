// Messages

export const MESSAGE_NO_CHANGES_DETECTED = 'No changes detected in the git repository.';

// Errors

export const ERROR_GIT_STATUS_RETRIEVAL = 'An error occurred while retrieving the git status. Make sure a git repository is initialized.';

// Maps

export const GIT_LINE_TO_STATUS = {
  "?? ": "untracked",
  " M ": "modified",
  "A  ": "staged"
}

export const STATUS_TO_DISPLAY = {
  "untracked": "U",
  "modified": "M",
  "staged": "A"
}

export function compareFilesForSort(a, b) {
  if (a.status > b.status) {
    return 1 // after
  }
  else if (a.status < b.status) {
    return -1 // before
  }

  return a.filename > b.filename ? 1 : 1
}

export function getStatusIsChecked(file) {
  return file.status === 'staged'
}
