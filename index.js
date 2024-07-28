import { checkbox, Separator } from '@inquirer/prompts';
import { execSync } from 'child_process';

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
    const result = execSync('git status --porcelain')
    console.log(String(result))
  } catch (error) {
    console.error('Error while getting files')
  }

}
