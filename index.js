import { checkbox, Separator } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { compareFilesForSort, ERROR_GIT_STATUS_RETRIEVAL, getStatusFromLine, getStatusIsChecked, MESSAGE_NO_CHANGES_DETECTED, STATUS_TO_DISPLAY } from './constants.js';
import { logger } from './utils.js';

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
    logger.logError(ERROR_GIT_STATUS_RETRIEVAL, error)
  }
}

function lineToFile(line) {
  // TODO: get individual files from untracked directory

  return {
    filePath: line.slice(3),
    status: getStatusFromLine(line)
  }
}

function getChoices(files) {
  return files.sort(compareFilesForSort).map(file => ({
    filePath: file.filePath,
    checked: getStatusIsChecked(file),
    value: `${STATUS_TO_DISPLAY[file.status]} ${file.filePath}`,
  }))
}
