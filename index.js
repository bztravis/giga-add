import { checkbox, Separator } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { ERROR_GIT_STATUS_RETRIEVAL, MESSAGE_NO_CHANGES_DETECTED } from './constants.js';

getEligibleFiles()

// const answer = await checkbox({
//   message: 'Select a package manager',
//   choices: [
//     { name: 'npm', value: 'npm' },
//     { name: 'yarn', value: 'yarn' },
//     // new Separator(),
//     { name: 'pnpm', value: 'pnpm', disabled: true },
//     { name: 'yarn2', value: 'yarn2' },
//     {
//       name: 'pnpm',
//       value: 'pnpm',
//       disabled: '(pnpm is not available)',
//     },
//   ],
// });

async function getEligibleFiles() {
  try {
    const result = String(execSync('git status --porcelain'))

    if (result === '') {
      console.log(MESSAGE_NO_CHANGES_DETECTED)
    }
  } catch (error) {
    console.error(ERROR_GIT_STATUS_RETRIEVAL)
  }

}
