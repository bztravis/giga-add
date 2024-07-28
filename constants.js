// Messages

export const MESSAGE_NO_CHANGES_DETECTED = 'No changes detected in the git repository.';

// Errors

export const ERROR_GIT_STATUS_RETRIEVAL = 'An error occurred while retrieving the git status. Make sure a git repository is initialized.';


export function getStatusFromLine(line) {
  const status = line.slice(0, 2)

  if (status.includes('?')) {
    return "untracked"
  }

  if (status.includes('D')) {
    return "deleted"
  }

  if (status === ' M') {
    return "modified"
  }

  if (status === 'M ') {
    return "staged"
  }

  throw new Error(`Error thrown on line: ${line}`)
}

export const STATUS_TO_DISPLAY = {
  "untracked": "U",
  "modified": "M",
  "deleted": "D",
  "staged": "A"
}

const STATUS_ORDER = {
  "untracked": 0,
  "modified": 1,
  "deleted": 2,
  "staged": 3
}

export function compareFilesForSort(a, b) {
  return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
}

export function getStatusIsChecked(file) {
  return file.status === 'staged'
}
