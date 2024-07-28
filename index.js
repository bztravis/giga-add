import { checkbox, Separator } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { compareFilesForSort, ERROR_GIT_STATUS_RETRIEVAL, getStatusIsChecked, GIT_LINE_TO_STATUS, MESSAGE_NO_CHANGES_DETECTED, STATUS_TO_DISPLAY } from './constants.js';

const files = getEligibleFiles()

const choices = getChoices(files)

const answer = await checkbox({
  message: "Select files to stage",
  choices
});

function getEligibleFiles() {
  try {
    const result = String(execSync('git status --porcelain'))
    const lines = result.split('\n').filter(Boolean)

    if (lines.length === 0) {
      console.log(MESSAGE_NO_CHANGES_DETECTED)
      return
    }

    return lines.map(lineToFile)

  } catch (error) {
    console.log(ERROR_GIT_STATUS_RETRIEVAL)
  }
}

function lineToFile(line) {
  // TODO: get individual files from untracked directory

  return {
    filename: line.slice(3),
    status: GIT_LINE_TO_STATUS[line.slice(0, 3)]
  }
}

function getChoices(files) {
  return files.sort(compareFilesForSort).map(file => ({
    filename: file.filename,
    checked: getStatusIsChecked(file),
    value: `${STATUS_TO_DISPLAY[file.status]} ${file.filename}`,
  }))
}
