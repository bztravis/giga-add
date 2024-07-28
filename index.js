import { checkbox, Separator } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { compareFilesForSort, ERROR_GIT_STATUS_RETRIEVAL, ERROR_UNKNOWN_ERROR, getStatusFromLine, getStatusIsChecked, MAX_FILES_TO_DISPLAY, MESSAGE_NO_CHANGES_DETECTED, STATUS_TO_DISPLAY } from './constants.js';
import { logger } from './utils.js';

try {
  await main()
} catch (error) {
  if (String(error).includes('User force closed the prompt')) {
    process.exit()
  }

  logger.logError(ERROR_UNKNOWN_ERROR, error)
  process.exit()
}

export async function main() {
  const files = getEligibleFiles()
  // console.log(files)

  const choices = getChoices(files)

  const answer = await checkbox({
    message: "Select files to stage",
    pageSize: MAX_FILES_TO_DISPLAY,
    choices
  });

  execSync('echo "taco"')

  // console.log(answer)

  const selectedFilePaths = new Set(answer.map(getFilePathFromFileValue))
  // console.log(selectedFilePaths)

  files.forEach(file => { actOnFile(selectedFilePaths, file) })
}

function actOnFile(selectedFilePaths, file) {
  // console.log(file.filePath)

  if (selectedFilePaths.has(file.filePath)) {
    // console.log("stage")
    stageFilePath(file.filePath)
    return
  }

  unstageFilePath(file.filePath)
  // console.log("unstaging")
  // console.log("\n\n")
}

function getFilePathFromFileValue(value) {
  return value.slice(2)
}

function unstageFilePath(filePath) {
  execSync(`git reset HEAD ${filePath}`)
}

function stageFilePath(filePath) {
  execSync(`git add ${filePath}`)
  // console.log(result)
}

function getEligibleFiles() {
  try {
    const result = String(execSync('git status --porcelain'))
    const lines = result.split('\n').filter(Boolean)

    if (lines.length === 0) {
      logger.logFinalMessage(MESSAGE_NO_CHANGES_DETECTED)
      process.exit()
    }

    return lines.map(lineToFile)

  } catch (error) {
    logger.logError(ERROR_GIT_STATUS_RETRIEVAL, error)
  }
}

function lineToFile(line) {
  // TODO: get individual files from untracked directory
  // happens when no file is staged in a directory, condition on if filePath ends with '/'?

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
